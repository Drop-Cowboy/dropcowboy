// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Phone line and number calls used by the local presence recipe.

import { RecipeError, optionalVar } from './config.js';
import { listOf } from './lookups.js';

const DEFAULT_LINE_NAME = 'Local presence';
const IMPORT_POLL_INTERVAL_MS = 2000;
const IMPORT_POLL_TIMEOUT_MS = 60000;
const CANDIDATES_PER_AREA_CODE = 3;

// DC_PHONE_LINE_ID, else a line with the exact name DC_LINE_NAME, else a new one.
async function findOrCreateLine({ client, env, out }) {
    const configured = optionalVar(env, 'DC_PHONE_LINE_ID');
    if (configured !== null) {
        out.log('Phone line: ' + configured + ' (DC_PHONE_LINE_ID)');
        return configured;
    }

    const name = optionalVar(env, 'DC_LINE_NAME') || DEFAULT_LINE_NAME;
    const found = await client.get('/phone/public/lines', { query: { search_term: name } });
    const lines = listOf(found);
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].name === name) {
            out.log('Phone line: reusing "' + name + '" (' + lines[i].ivr_id + ')');
            return lines[i].ivr_id;
        }
    }

    const created = await client.post('/phone/public/lines', { name, type: 'voice' });
    const lineId = created && created.data ? created.data.ivr_id : null;
    if (typeof lineId !== 'string') {
        throw new RecipeError('POST /phone/public/lines answered without an ivr_id.');
    }
    out.log('Phone line: created "' + name + '" (' + lineId + ')');
    return lineId;
}

// Loads numbers you already own onto the line. The route answers 202 with a
// job id; poll the job until it is completed or failed.
async function importNumbers({ client, out, lineId, numbers, pollIntervalMs = IMPORT_POLL_INTERVAL_MS, pollTimeoutMs = IMPORT_POLL_TIMEOUT_MS, sleep = defaultSleep }) {
    const accepted = await client.post('/phone/public/numbers/import', { phone_numbers: numbers, phone_line_id: lineId });
    const jobId = accepted && accepted.data ? accepted.data.long_job_id : null;
    if (typeof jobId !== 'string') {
        throw new RecipeError('The number import was accepted without a long_job_id.');
    }
    out.log('Importing ' + numbers.length + ' number(s). Job ' + jobId);

    const deadline = Date.now() + pollTimeoutMs;
    for (;;) {
        const job = (await client.get('/phone/public/numbers/import/' + jobId)).data || {};
        if (job.status === 'completed') {
            printImportResult(out, job.result || {});
            return job.result;
        }
        if (job.status === 'failed') {
            throw new RecipeError('Number import failed: ' + (job.error || 'no reason given') + ' (job ' + jobId + ')');
        }
        if (Date.now() + pollIntervalMs > deadline) {
            throw new RecipeError('The number import is still running after ' + Math.round(pollTimeoutMs / 1000) + ' seconds. Check it later with GET /phone/public/numbers/import/' + jobId);
        }
        await sleep(pollIntervalMs);
    }
}

function printImportResult(out, result) {
    out.log('Import finished: added=' + result.added + ' updated=' + result.updated + ' invalid=' + result.invalid + ' conflicts=' + result.conflicts);
    if (Array.isArray(result.sample_invalid) && result.sample_invalid.length > 0) {
        out.log('  Not valid numbers: ' + result.sample_invalid.join(', '));
    }
    if (Array.isArray(result.sample_conflicts) && result.sample_conflicts.length > 0) {
        out.log('  Held by another account (not loaded): ' + result.sample_conflicts.join(', '));
    }
}

// Searching buys nothing. Returns the first candidate of each area code.
async function searchAreaCodes({ client, out, areaCodes }) {
    const picks = [];
    for (let i = 0; i < areaCodes.length; i++) {
        const found = await client.post('/phone/public/numbers/available', {
            country_iso: 'US',
            pattern: areaCodes[i],
            type: 'local',
            limit: CANDIDATES_PER_AREA_CODE
        });
        const candidates = listOf(found);
        if (candidates.length === 0) {
            out.log('Area code ' + areaCodes[i] + ': no numbers found.');
            continue;
        }
        out.log('Area code ' + areaCodes[i] + ': ' + candidates.map(describeCandidate).join(', '));
        picks.push(candidates[0].phone_number);
    }
    return picks;
}

function describeCandidate(candidate) {
    return candidate.location_label ? candidate.phone_number + ' (' + candidate.location_label + ')' : candidate.phone_number;
}

// Renting buys numbers from your carrier, so it only runs when you opted in.
async function rentNumbers({ client, out, lineId, numbers }) {
    const rented = await client.post('/phone/public/numbers/rent', { numbers, voice_ivr_id: lineId });
    const list = rented && rented.data && Array.isArray(rented.data.numbers) ? rented.data.numbers : numbers;
    out.log('Rented ' + list.length + ' number(s) onto the line: ' + list.join(', '));
    return list;
}

async function listLineNumbers({ client, lineId }) {
    const body = await client.get('/phone/public/lines/' + lineId + '/numbers');
    return listOf(body);
}

function defaultSleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

export { findOrCreateLine, importNumbers, listLineNumbers, rentNumbers, searchAreaCodes };
