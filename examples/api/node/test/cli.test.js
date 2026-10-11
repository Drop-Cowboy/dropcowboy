import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { afterEach, describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { KEY, MEDIA_ID, SECRET, baseEnv } from '../testkit/helpers.js';
import { startMockApi } from '../testkit/mock-api.js';
import { ok, problem, standardRoutes } from '../testkit/routes.js';

const ROOT = fileURLToPath(new URL('../', import.meta.url));

let mock;

// Runs a script the way a reader does, with a clean environment, so a
// developer's own DC_* variables cannot change the result.
function runScript(script, env) {
    return new Promise(function (resolve, reject) {
        const child = spawn(process.execPath, [script], { cwd: ROOT, env: Object.assign({ PATH: process.env.PATH }, env) });
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', (chunk) => { stdout += chunk; });
        child.stderr.on('data', (chunk) => { stderr += chunk; });
        child.on('error', reject);
        child.on('close', (code) => resolve({ code, stdout, stderr }));
    });
}

afterEach(async () => {
    if (mock) {
        await mock.close();
        mock = null;
    }
});

describe('running a recipe from the command line', () => {
    it('exits 0 and prints the accepted message', async () => {
        mock = await startMockApi(standardRoutes());
        const result = await runScript('src/recipes/send-rvm-retail.js', baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }));

        assert.equal(result.code, 0, result.stderr);
        assert.match(result.stdout, /Accepted \(202\): message_id=/);
        assert.equal(result.stdout.split('\n')[0], 'Send only to people who agreed to hear from you. Test with numbers you own.');
        assert.equal(result.stdout.split('Send only to people who agreed').length - 1, 1);
        assert.ok(!result.stdout.includes(SECRET) && !result.stderr.includes(SECRET));
    });

    it('exits 1 with a plain message when the credentials are missing', async () => {
        const result = await runScript('src/recipes/send-rvm-retail.js', { DC_TO: '+13125550142' });

        assert.equal(result.code, 1);
        assert.match(result.stderr, /DC_KEY and DC_SECRET not set/);
        assert.ok(!/at .*\.js:\d+/.test(result.stderr), 'a stack trace was printed');
    });

    it('exits 1 and prints status, title, detail and request id for an API error', async () => {
        mock = await startMockApi(standardRoutes({ 'POST /rvm': problem(403, 'Forbidden', 'This key cannot send.', 'missing_scope') }));
        const result = await runScript('src/recipes/send-rvm-retail.js', baseEnv(mock, { DC_MEDIA_ID: MEDIA_ID }));

        assert.equal(result.code, 1);
        assert.match(result.stderr, /Status:\s+403/);
        assert.match(result.stderr, /Title:\s+Forbidden/);
        assert.match(result.stderr, /Detail:\s+This key cannot send\./);
        assert.match(result.stderr, /Code:\s+missing_scope/);
        assert.match(result.stderr, /Request id:/);
        assert.ok(!result.stderr.includes(SECRET) && !result.stderr.includes(KEY));
    });

    it('subscribe exits 1 without DC_PUBLIC_URL', async () => {
        mock = await startMockApi({ 'POST /register/public/webhooks': ok({}, 201) });
        const result = await runScript('src/subscribe.js', baseEnv(mock));

        assert.equal(result.code, 1);
        assert.match(result.stderr, /DC_PUBLIC_URL/);
    });

    it('importing a recipe does not run it', async () => {
        const result = await new Promise((resolve) => {
            const child = spawn(process.execPath, ['--input-type=module', '-e', "await import('./src/recipes/send-rvm-tts.js'); console.log('imported');"], { cwd: ROOT, env: { PATH: process.env.PATH } });
            let stdout = '';
            child.stdout.on('data', (chunk) => { stdout += chunk; });
            child.on('close', (code) => resolve({ code, stdout }));
        });

        assert.equal(result.code, 0);
        assert.equal(result.stdout.trim(), 'imported');
    });
});

describe('the receiver from the command line', () => {
    it('starts, answers /health and the callback route, and stops on SIGTERM', async () => {
        const child = spawn(process.execPath, ['src/receiver.js'], { cwd: ROOT, env: { PATH: process.env.PATH, PORT: '0', DC_WEBHOOK_SECRET: 'e4b1c7a9-3f2d-4e8b-9a6c-5d1f8b2e7c30' } });
        let stdout = '';
        child.stdout.on('data', (chunk) => { stdout += chunk; });
        const closed = new Promise((resolve) => child.on('close', (code, signal) => resolve({ code, signal })));

        const port = await new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('receiver did not start: ' + stdout)), 5000);
            child.stdout.on('data', () => {
                const match = /Receiver listening on http:\/\/127\.0\.0\.1:(\d+)/.exec(stdout);
                if (match) {
                    clearTimeout(timer);
                    resolve(Number(match[1]));
                }
            });
        });

        const health = await fetch('http://127.0.0.1:' + port + '/health');
        assert.equal(health.status, 200);
        const callback = await fetch('http://127.0.0.1:' + port + '/callbacks/dropcowboy', { method: 'POST', body: '{"status":"success","foreign_id":"x"}' });
        assert.equal(callback.status, 200);
        assert.match(stdout, /DC_PUBLIC_URL is not set/);

        child.kill('SIGTERM');
        const end = await closed;
        assert.equal(end.code, 0);
    });
});
