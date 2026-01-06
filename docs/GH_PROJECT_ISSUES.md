Build With AI — Initial GitHub Issues (copy/paste into GH Issues)
===============================================================

1) Repo scaffold + CI
- Description: Create monorepo, GH actions for lint/test/build, protect `main`.
- Labels: area:docs, type:chore, priority:high

2) Email verification flow
- Description: Implement verification tokens, Mailcow SMTP send, verify endpoint, JWT issuance.
- Labels: area:identity, type:feature, priority:high

3) Static site generator endpoint
- Description: Implement prompt->static HTML generator and artifact storage.
- Labels: area:builder, type:feature, priority:high

4) Vercel deploy integration
- Description: Vercel API adapter: programmatic deploy and domain aliasing.
- Labels: area:builder, type:feature, priority:high

5) Operator Payments API skeleton
- Description: API routes for orders and transactions; DB schema for ledger.
- Labels: area:operator, type:feature, priority:high

6) NOWPayments adapter
- Description: Implement provider adapter, create order flow and webhook validation.
- Labels: area:operator, type:feature, priority:high

7) Webhook idempotency layer
- Description: Idempotency middleware and requests logging.
- Labels: area:operator, type:feature, priority:high

8) Transactional email templates
- Description: Templates for receipt, refund, verification, alerts.
- Labels: area:mailcow, type:feature, priority:medium

9) CRM events table + API
- Description: Create `crm_events` table and server endpoints for logging.
- Labels: area:crm, type:feature, priority:medium

10) Reconciliation worker
- Description: Implement job to match provider settlements with ledger entries.
- Labels: area:operator, type:feature, priority:high

11) Fraud rules engine MVP
- Description: Implement deterministic heuristics for high/medium risk detection.
- Labels: area:fraud, type:feature, priority:high

12) Daily digest job
- Description: Aggregate payments, refunds, fraud cases; email digest to operators.
- Labels: area:agent-marz, type:feature, priority:medium

13) Operator dashboard basic views
- Description: Transactions list, filters, fraud cases view.
- Labels: area:operator, type:feature, priority:high

14) MARZ chat widget backend
- Description: API for chat sessions and transcript logging (no MARZ DB user).
- Labels: area:agent-marz, type:feature, priority:medium

15) Tenant model & JWT scoping
- Description: Add `tenants` table, tenant_id to key tables, tenant-scoped JWT.
- Labels: area:identity, type:feature, priority:high
