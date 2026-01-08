RFC: Build With AI — Autonomous AI Website Builder & Operator Automation
=====================================================================

Status: Draft

Summary
-------
Build With AI is a production-first platform enabling AI-generated websites and deterministic operator automation. The Operator Agent persona (MARZ) orchestrates monitoring, digests, escalations, and summaries. MARZ is a persona only and must not be stored as a DB entity.

Motivation
----------
- Enable zero-touch website creation and deploy workflows
- Provide deterministic, auditable automation for payments and operations

Goals
-----
- Deterministic jobs and idempotent webhooks
- Auditable operator actions and automation decisions
- Production-grade security and governance

Architecture Overview
---------------------
See `docs/ONBOARDING.md` for ASCII architecture diagram and component list.

Components
----------
- AI Website Builder (Next.js)
- Operator Payments API (service for orders and transactions)
- Mailcow integration (SMTP + admin API)
- Identity (email verification, JWT)
- CRM events and operator dashboard
- Fraud rules engine and escalation playbooks
- MARZ Orchestrator (deterministic workflows)

Data Model (high level)
-----------------------
- users, tenants, sites, orders, transactions, refunds, reconciliation_records, fraud_assessments, crm_events, operator_audit

Security Considerations
-----------------------
- Signed commits required for `main`
- Secrets managed in GitHub Secrets or KMS
- Operator endpoints protected with proper RBAC + 2FA for critical actions

Operational Considerations
--------------------------
- Monitoring and alerts for webhook failures, reconciliation mismatches, and high-risk fraud cases
- On-call runbooks in `docs/runbooks/`

Rollout Plan
------------
- Follow roadmap (Q1→Q4). Deploy core functionality first and validate end-to-end flows.

Open Questions
--------------
- Tenant billing model and compliance with crypto settlement regulations.

Operator Payments — Acceptance Criteria
--------------------------------------
These are the concrete, testable acceptance criteria for the Operator Payments subsystem.

- Order lifecycle
	- Create order: an authenticated operator or tenant can create an `order` with a unique id, amount, currency, and metadata.
	- Persisted: the order is stored in the transactions/orders table and retrievable by id within 1s.

- Payment initiation
	- Provider request: the system can generate a provider-ready payment request (NOWPayments / Coinbase Commerce) and return a checkout URL or signed payload.
	- Idempotency: repeated identical payment initiation requests (same idempotency key) must not create duplicate provider flows or duplicate orders.

- Webhook handling
	- Webhook processor: the system accepts provider webhooks, validates signatures, and updates order/transaction records atomically.
	- Idempotent processing: duplicate webhook deliveries must be deduplicated and not produce duplicated ledger entries.

- Reconciliation
	- Daily reconciliation job: a scheduled job reconciles provider settlement records with internal transactions and produces a reconciliation report with mismatches flagged.
	- Alerting: if reconciliation mismatch rate > 0.1% for 24h, raise a high-severity alert.

- Refunds & chargebacks
	- Refund API: operators can request refunds; system generates refund requests to provider and records refund transactions with status updates.
	- Idempotent refunds: repeated refund requests for the same transaction do not create multiple refunds.

- Security & governance
	- Audit logs: every operator-initiated payment action (create order, refund, dispute) is recorded in `operator_audit` with user id, action, timestamp, and request metadata.
	- Secrets: provider keys are stored in the secret manager (not in the repo) and rotations are supported without code changes.

- Observability & SLOs
	- Error rate: payment endpoint error rate must be < 0.5% averaged over 1 hour.
	- Latency: median payment initiation < 300ms; 95th percentile < 1s.
	- Monitoring: Sentry/OTel traces for end-to-end payment flows (initiation → webhook reconciliation) must exist for sampling 100% of errors and 1% of successful requests.

- Testing & CI
	- Integration tests: automated CI tests exercise payment initiation, webhook simulation, and reconciliation with mocked providers.
	- Contract tests: webhook signature verification and idempotency behavior covered by contract tests.

- Acceptance verification
	- Manual verification doc: a short checklist (create order, complete payment via provider sandbox, trigger webhook, run reconciliation) must pass before merging Payment feature to `main`.

