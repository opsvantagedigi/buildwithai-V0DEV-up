Operator Payments — Verification Checklist
=========================================

Manual verification steps (before merging payment feature to `main`):

- Create Order
  - [ ] Use operator API to create an order with unique id and metadata.
  - [ ] Confirm order exists in Postgres within 1s and has status `created`.

- Initiate Payment
  - [ ] Call payment initiation endpoint and receive provider checkout URL or signed payload.
  - [ ] Verify idempotency: repeat request with same idempotency key — ensure no duplicate provider flows.

- Complete Payment (provider sandbox)
  - [ ] Complete a sandbox payment using provider URL.
  - [ ] Provider sends webhook; system processes webhook and updates order to `paid`.

- Webhook Handling
  - [ ] Test duplicate webhook delivery: send same webhook twice — only one ledger entry and state change.
  - [ ] Test invalid signature handling: send webhook with bad signature — ensure it's rejected and logged.

- Refund Flow
  - [ ] Request a refund via API and verify refund transaction is recorded and provider refund call is initiated.
  - [ ] Attempt duplicate refund for same transaction and confirm idempotency.

- Reconciliation
  - [ ] Run daily reconciliation script for a small time window; confirm report is generated and mismatches flagged.

- Observability & SLOs
  - [ ] Confirm Sentry received a sample error from a simulated failure.
  - [ ] Confirm Grafana dashboard shows the payment latency and error metrics.

CI / Automated tests to include

- Unit tests: idempotency helpers, webhook signature verifier, refund logic.
- Integration tests (mocked provider): payment initiation → simulated webhook → reconciliation run.
- Contract tests for webhook payload shapes and signature verification.

Acceptance: all manual checklist items pass and CI tests succeed in preview environment.
