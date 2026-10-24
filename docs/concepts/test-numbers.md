# Test numbers

You can build and test almost everything without reaching a real phone or
paying anything. There are three kinds of test number, each for a different
job:

| Kind | Numbers | What happens | Cost |
|---|---|---|---|
| [555 test numbers](#555-test-numbers) | Any `+1 555 XXX XXXX` outside the reserved range, such as `+15555550123` | A call behaves the way its last four digits say. A text gets an automatic reply. | Free |
| [Simulated numbers](#simulated-numbers) | `+1 555 001 XXXX` (ringless voicemail) and `+1 555 002 XXXX` (texts) | No call or text. The send returns the result you picked, so you can test how your code handles it. | Free |
| [Your own phones](#your-own-phones) | Real numbers you add on the **Dialing rules** page | A real voicemail, call or text reaches your phone. | Billed |

Only area code 555 is free. A sample number such as `+13125550142` has a real
area code, so it's a real number: it's dialed and billed like any other.

`+1 555 000 XXXX` and `+1 555 003 XXXX` are reserved. Don't use them.

## 555 test numbers

Every account can call and text 555 numbers, with nothing to set up: no
carrier, phone number, registration or funds. Use them to build and demo a
dialer, an inbox or a texting flow first. The
[Starter CRM](https://github.com/Drop-Cowboy/starter-crm) uses them for its
first call and text.

### Test calls

Call a 555 number from the dashboard dial pad or a Building Blocks dialer. You
don't need a caller ID of your own. The last four digits pick what happens, so
any 555 number ending in `0005` is busy:

| Last four | What happens |
|---|---|
| `0001`, or anything not listed | Answers, plays nothing, and hangs up after 30 seconds. |
| `0002` | Answers and plays a person speaking, then hangs up after 20 seconds. |
| `0003` | Answers after a longer ring and plays a voicemail greeting, then hangs up after 25 seconds. |
| `0004` | Rings for 30 seconds, then ends as no answer. |
| `0005` | Busy. |
| `0006` | Fails, as an unreachable number would. |
| `0007` | Declines the call. |
| `0008` | Answers, presses `1` after 2.5 seconds, then hangs up. |
| `0009` | Answers, presses `9` after 2.5 seconds, then hangs up. |
| `0010` | Answers, presses `0` after 2.5 seconds, then hangs up. |

Use `0002` and `0003` to test voicemail detection, and `0008` to `0010` to
test keypad menus, such as confirm, opt out and transfer to an agent.

An account can have five test calls going at once. A sixth is refused with
reason `sandbox_concurrency`. A 555 number can be the caller ID of a call to
another 555 number, never to a real one; that's refused with
`sandbox_caller_id`.

### Test texts

Text a 555 number the way you text anyone, for example with `POST /sms`. You
don't need a phone number to send from: without a `phone_line_id`, Drop Cowboy
picks a 555 sender for you. A few seconds later, the 555 number replies:

```text
sandbox got your message: Your order is ready for pickup.
```

The reply is an ordinary inbound text. It arrives on the
`contact.msg.received` webhook and in the conversation, so you can test your
inbox and your reply handling end to end.

So that a bot can't reply to a bot forever, a 555 number doesn't reply to a
text that starts with `sandbox got your message:`, or to more than 10 texts in
an hour from the same sender.

A test text skips the checks a real text needs, such as calling hours, consent
and texting registration. RCS isn't simulated: send `body`, not a
`template_id`.

### Accounts that can only use test numbers

An account with no connected carrier, or no funds, can still use Building
Blocks, limited to 555 numbers. The token's mint response, and
`GET /register/public/integration-readiness`, say so with `sandbox_only: true`
and a `sandbox_only_reason` of `byoc_required` (no carrier) or
`insufficient_balance` (no funds). A call or text to a real number then fails
with `403` and code `sandbox_only`. Connect a carrier and add funds, then mint a
new token.

The full details are on
[555 test numbers](https://www.dropcowboy.com/developers/api/test-numbers).

## Simulated numbers

Send a ringless voicemail or a text through the API to one of these numbers,
and nothing is dialed or texted. Each number always returns the same result a
few seconds later, at your `callback_url`, your webhooks and API Logs. Use
them to test how your code handles each result.

Simulated sends ignore calling hours and have no recording, so they never
carry a proof-of-delivery link. The result's `from` is a simulated number too.

Ringless voicemail:

| Number | Result |
|---|---|
| `+15550010001` | `success`, `0` |
| `+15550010002` | `failure`, `4000` (VoiceMail Not Detected) |
| `+15550010004` | `failure`, `4005` (No Answer) |
| `+15550010005` | `failure`, `4006` (User Busy) |
| `+15550010006` | `failure`, `4004` (Number not reachable) |
| `+15550010090` | `failure`, `4016` (Internal DNC) |
| `+15550010091` | `failure`, `4017` (Known Litigator) |
| `+15550010092` | `failure`, `4019` (RND Reassigned) |
| `+15550010093` | `failure`, `4021` (RND Error) |
| `+15550010094` | `failure`, `6000` (Carrier Denied Use Case) |
| `+15550010095` | `failure`, `6002` (Pool Suspended) |
| `+15550010097` | `failure`, `4013` (Too Many Attempts) |
| `+15550010098` | `failure`, `6005` (Opt-in Revoked) |
| `+15550010099` | `failure`, `6011` (Opt-in Missing) |

Texts:

| Number | Result |
|---|---|
| `+15550020001` | `success`, `0` |
| `+15550020003` | `failure`, `4004` (Number not reachable) |
| `+15550020005` | `failure`, `4008` (Spam detected) |
| `+15550020090` | `failure`, `4016` (Internal DNC) |
| `+15550020091` | `failure`, `4017` (Known Litigator) |
| `+15550020092` | `failure`, `6000` (Carrier Denied Use Case) |
| `+15550020093` | `failure`, `6003` (Pool Not Ready) |
| `+15550020095` | `failure`, `4013` (Too Many Attempts) |
| `+15550020096` | `failure`, `6006` (Opt-in Pending) |
| `+15550020097` | `failure`, `6004` (Opt-in Flagged) |
| `+15550020098` | `failure`, `6011` (Opt-in Missing) |
| `+15550020099` | `failure`, `6001` (Carrier Suspension) |

## Your own phones

To hear or read the real thing, send to a phone you own. On the
[**Dialing rules**](https://www.dropcowboy.com/app/#/dialing-rules) page in
the dashboard, add your phone numbers as **test numbers**. Then:

- They skip the contact frequency limit, so you can send to yourself as often
  as you like. (Normal numbers get at most 3 attempts in 3 days by default.
  Going over fails with `4013`.)
- Calling hours still apply by default. Drop Cowboy checks federal and
  state-specific calling hours in the contact's time zone on every send. A
  voicemail sent outside them waits until the window opens. A text sent outside
  them fails with `4011`. To test at any time of day, turn on **Allow Test
  Numbers to Bypass TCPA Hours** on the same page. It applies only to your test
  numbers.

Test email addresses on the same page skip the email frequency cap.

### Testing mode

Support can put an account in **testing mode**, for example while it is moving
to its own carrier. In testing mode, ringless voicemail and voice broadcast
sends go only to the phones on your Dialing rules page. A send to any other
number fails with `3040` (Test Numbers Only).

The quickstart checks this before sending: it reads
`GET /register/public/integration-readiness`, prints `test_numbers_only` and
your `test_numbers`, and warns you when `DC_TO` isn't one of them.

## Read more

- [555 test numbers](https://www.dropcowboy.com/developers/api/test-numbers)
- [Send lifecycle: simulated numbers](https://www.dropcowboy.com/developers/api/send-lifecycle#simulated-numbers)
- [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier)

---

Always consult with your legal counsel to confirm compliance procedures for your specific use case.
