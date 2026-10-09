// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Recipe: local presence on your own carrier (BYOC).
//
// Put several numbers on one phone line, then send with the line and no
// caller_id. For each recipient the platform picks the number on the line
// closest to them, and falls back to a number on the line when it cannot place
// the recipient. You do not choose the number, so never send caller_id here.
// Always identify your business location truthfully when asked by recipients.
//
//   0. Pick the audio first, so a setup mistake stops before anything changes.
//   1. Find or create the phone line.
//   2. Add numbers: load ones you own (DC_NUMBERS), and optionally search
//      (DC_AREA_CODES) and rent (only with DC_RENT=yes) more.
//   3. Confirm the line has numbers.
//   4. POST /rvm with phone_line_id and the audio.
//   5. When the result arrives, print which number was used.

import { clientFromEnv } from '../lib/client.js';
import { isMain, printConsentLine, runCli } from '../lib/cli.js';
import { RecipeError, optionalVar, requireE164, splitList } from '../lib/config.js';
import { resolveAudio } from '../lib/lookups.js';
import { refuseSampleValues } from '../lib/sample-values.js';
import { findOrCreateLine, importNumbers, listLineNumbers, rentNumbers, searchAreaCodes } from '../lib/phone-line.js';
import { sendAndWait } from '../lib/send-and-wait.js';
import { buildRvmBody } from '../lib/send.js';

async function run({ env = process.env, out = console, client = clientFromEnv(env), pollIntervalMs, pollTimeoutMs, sleep, fetchFn } = {}) {
    printConsentLine(out);
    refuseSampleValues(env);
    const to = requireE164(env, 'DC_TO', 'Use a number you own, or one that agreed to hear from you.');
    const numbers = numbersFromEnv(env);
    const areaCodes = splitList(env.DC_AREA_CODES);

    const audio = await resolveAudio({ client, env, out, mode: 'local-presence', fetchFn });

    const lineId = await findOrCreateLine({ client, env, out });

    if (numbers.length > 0) {
        await importNumbers({ client, out, lineId, numbers, pollIntervalMs, pollTimeoutMs, sleep });
    }
    if (areaCodes.length > 0) {
        await addFromAreaCodes({ client, env, out, lineId, areaCodes });
    }

    const lineNumbers = await listLineNumbers({ client, lineId });
    if (lineNumbers.length === 0) {
        throw new RecipeError('The phone line has no numbers, and a line with no numbers cannot send. Set DC_NUMBERS to numbers you own, or DC_AREA_CODES with DC_RENT=yes, or add numbers in the dashboard.');
    }
    out.log('The line has ' + lineNumbers.length + ' number(s): ' + lineNumbers.map(function (n) { return n.phone_number; }).join(', '));

    const outcome = await sendAndWait({
        client,
        env,
        out,
        to,
        buildBody: function ({ foreignId, callbackUrl }) {
            return buildRvmBody({ to, phoneLineId: lineId, audio, foreignId, callbackUrl });
        }
    });

    printPickedNumber(out, outcome.result);
    return outcome;
}

async function addFromAreaCodes({ client, env, out, lineId, areaCodes }) {
    const picks = await searchAreaCodes({ client, out, areaCodes });
    if (picks.length === 0) {
        return;
    }
    if (optionalVar(env, 'DC_RENT') !== 'yes') {
        out.log('Dry run: set DC_RENT=yes to rent these (' + picks.join(', ') + '). Renting charges your carrier. Nothing was rented.');
        return;
    }
    await rentNumbers({ client, out, lineId, numbers: picks });
}

function numbersFromEnv(env) {
    const numbers = splitList(env.DC_NUMBERS);
    for (let i = 0; i < numbers.length; i++) {
        requireE164({ DC_NUMBERS: numbers[i] }, 'DC_NUMBERS', 'Every entry in the list must be a number you already own.');
    }
    return numbers;
}

function printPickedNumber(out, result) {
    if (result === null || !result.from) {
        out.log('When a result arrives, its caller id (from on a webhook, caller_id on a callback) shows which number was used.');
        return;
    }
    out.log('Number used: ' + result.from);
    out.log('The platform picked this number from your line. It chooses the number on the line closest to the recipient, and falls back to a number on the line when it cannot place the recipient. Always identify your business location truthfully when asked by recipients.');
}

if (isMain(import.meta.url)) {
    await runCli(run);
}

export { run };
