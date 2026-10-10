# Test numbers

There are two ways to test a send. A **simulated number** returns a chosen
result without reaching any phone, and it is free. A **test number** is a
phone you own: the send is real, it reaches that phone, and it is billed.

## Simulated numbers

Send to a number in area code 555, which isn't assigned to any phone. Nothing
is dialed or texted, and the send costs nothing. Each number always returns
the same result a few seconds later, at your `callback_url` and your webhooks,
so you can test how your code handles each outcome.

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

## Add your own numbers

To hear or read the real thing, send to a phone you own. On the **Dialing
rules** page in the dashboard, add your phone numbers as **test numbers**.
Then:

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

## Testing mode

Support can put an account in **testing mode**, for example while it is moving
to its own carrier. In testing mode, ringless voicemail and voice broadcast
sends go only to test numbers. A send to any other number fails with `3040`
(Test Numbers Only).

The quickstart checks this before sending: it reads
`GET /register/public/integration-readiness`, prints `test_numbers_only` and
your `test_numbers`, and warns you when `DC_TO` isn't one of them.

## Read more

- [Send lifecycle: simulated numbers](https://www.dropcowboy.com/developers/api/send-lifecycle#simulated-numbers)
- [Bring your own carrier](https://www.dropcowboy.com/developers/api/bring-your-own-carrier)

---

Always consult with your legal counsel to confirm compliance procedures for your specific use case.
