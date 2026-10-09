import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The pages load Building Blocks from https://webforms.dropcowboy.com/v<version>/.
// The tests answer those requests from a local folder instead, so they run
// offline and exercise the bundles you have, with the browser still checking
// each script against the integrity hash in the manifest.
//
// The folder is the first of:
//   1. DC_E2E_CDN_DIR, if set;
//   2. tests/e2e/cdn/, a vendored copy (the public repo ships one);
//   3. v2/app/src/assets, when this sample sits in the Drop Cowboy monorepo.

export const CDN_ORIGIN = 'https://webforms.dropcowboy.com';

const here = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = 'building-blocks-manifest.json';

export function findCdnDir() {
    const candidates = [
        process.env.DC_E2E_CDN_DIR,
        path.join(here, '..', 'cdn'),
        path.join(here, '..', '..', '..', '..', '..', '..', 'app', 'src', 'assets')
    ].filter(Boolean);
    for (const dir of candidates) {
        if (fs.existsSync(path.join(dir, MANIFEST))) {
            return path.resolve(dir);
        }
    }
    throw new Error('No Building Blocks bundles found. Looked for ' + MANIFEST + ' in:\n  '
        + candidates.join('\n  ') + '\nSet DC_E2E_CDN_DIR to a folder holding the manifest and its bundles.');
}

/**
 * Reads the manifest and checks every production bundle in it against its
 * integrity hash, so a stale build fails with a clear message instead of a
 * blank widget.
 */
export function loadCdn(dir) {
    const manifest = JSON.parse(fs.readFileSync(path.join(dir, MANIFEST), 'utf8'));
    const integrityByFile = new Map();
    for (const entry of manifest.files || []) {
        if (entry.kind === 'block' && entry.integrity) {
            integrityByFile.set(entry.file, entry.integrity);
        }
    }
    const served = new Set();
    const problems = [];

    function answer(url) {
        // /v3.33.0/dropcowboy-dock.js -> dropcowboy-dock.js
        const file = new URL(url).pathname.split('/').pop();
        const fullPath = path.join(dir, file);
        if (file !== MANIFEST && !integrityByFile.has(file)) {
            problems.push(file + ' is not a production bundle in ' + MANIFEST);
            return { status: 404, body: 'not found' };
        }
        if (!fs.existsSync(fullPath)) {
            problems.push(file + ' is listed in the manifest but missing from ' + dir);
            return { status: 404, body: 'not found' };
        }
        const body = fs.readFileSync(fullPath);
        if (file !== MANIFEST) {
            const actual = 'sha384-' + crypto.createHash('sha384').update(body).digest('base64');
            if (actual !== integrityByFile.get(file)) {
                problems.push(file + ' does not match its integrity hash in ' + MANIFEST
                    + '. The bundles are mid-rebuild or stale. Rebuild the Building Blocks CDN bundles next to ' + MANIFEST + ' and rerun.');
            }
        }
        served.add(file);
        return {
            status: 200,
            body,
            contentType: file.endsWith('.json') ? 'application/json' : 'text/javascript'
        };
    }

    return { dir, answer, served, problems };
}
