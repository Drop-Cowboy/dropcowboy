// Send only to people who agreed to hear from you. Test with numbers you own.
//
// Turns the two kinds of result into one small shape, and formats it for the
// terminal.
//
//   callback  The unsigned body POSTed to a send's callback_url. It echoes your
//             foreign_id and names the recipient in phone_number and the
//             number the platform sent from in caller_id.
//   webhook   A signed contact.rvm.status or contact.rvm.receipt event. It does
//             not carry foreign_id; the recipient is data.to and the number
//             the platform sent from is data.from.

const STATUS_EVENT = 'contact.rvm.status';
const RECEIPT_EVENT = 'contact.rvm.receipt';
const MAX_PRINTED_LENGTH = 200;

// Pick only the fields this example uses. The callback route has no signature,
// so anyone who finds the URL can post to it: read what you need and ignore
// the rest.
function callbackResult(body) {
    return {
        status: body.status,
        reason: body.reason,
        reason_code: body.reason_code,
        to: body.phone_number,
        from: body.caller_id,
        foreign_id: body.foreign_id,
        proof_of_delivery_url: body.proof_of_delivery_url
    };
}

function webhookResult(body) {
    const data = body.data !== null && typeof body.data === 'object' ? body.data : {};
    return {
        status: data.status,
        reason: data.reason,
        reason_code: data.reason_code,
        to: data.to,
        from: data.from,
        foreign_id: undefined,
        proof_of_delivery_url: data.proof_of_delivery_url
    };
}

function isHandledWebhookEvent(name) {
    return name === STATUS_EVENT || name === RECEIPT_EVENT;
}

// One line for the terminal, e.g.
//   callback status=failure reason="VoiceMail Full" reason_code=4002 to=+13125550142 from=+12125550100 foreign_id=...
function describeResult(source, eventName, result) {
    const label = source === 'webhook' ? 'webhook ' + printable(eventName) : 'callback';
    const parts = [label];
    const fields = ['status', 'reason', 'reason_code', 'to', 'from', 'foreign_id', 'proof_of_delivery_url'];
    for (let i = 0; i < fields.length; i++) {
        const value = result[fields[i]];
        if (value !== undefined && value !== null) {
            parts.push(fields[i] + '=' + printable(value));
        }
    }
    return parts.join(' ');
}

// Results come from the network, so make them safe to print: JSON-quote
// strings that hold spaces, replace control characters (a terminal escape in a
// forged callback body would otherwise run in your terminal) and cap the length.
function printable(value) {
    let text;
    if (typeof value !== 'string') {
        text = String(JSON.stringify(value));
    } else {
        text = /[\s"]|^$/.test(value) ? JSON.stringify(value) : value;
    }
    const safe = text.replace(/[^\x20-\x7e]/g, '?');
    return safe.length > MAX_PRINTED_LENGTH ? safe.slice(0, MAX_PRINTED_LENGTH) + '...' : safe;
}

function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function parseJsonObject(rawBody) {
    let parsed;
    try {
        parsed = JSON.parse(rawBody.toString('utf8'));
    } catch (err) {
        return null;
    }
    return isPlainObject(parsed) ? parsed : null;
}

export {
    RECEIPT_EVENT,
    STATUS_EVENT,
    callbackResult,
    describeResult,
    isHandledWebhookEvent,
    isPlainObject,
    parseJsonObject,
    printable,
    webhookResult
};
