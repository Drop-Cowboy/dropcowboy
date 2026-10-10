// Send only to people who agreed to hear from you. Test with numbers you own.
//
// The shared JSON in ../fixtures. Keep quickstart/ and fixtures/ side by side
// when you copy them.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FIXTURES_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'fixtures');

function fixturePath(name) {
    return path.join(FIXTURES_DIR, name);
}

function readFixtureText(name) {
    return fs.readFileSync(fixturePath(name), 'utf8');
}

function readFixture(name) {
    return JSON.parse(readFixtureText(name));
}

export { FIXTURES_DIR, fixturePath, readFixture, readFixtureText };
