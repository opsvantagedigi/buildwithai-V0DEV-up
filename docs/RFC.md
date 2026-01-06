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
