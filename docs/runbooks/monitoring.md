Runbook: Payments Monitoring
=============================

Purpose
-------
This runbook describes monitoring signals and initial investigation steps for payment-related failures.

Key Signals & Alerts
--------------------
- Payment initiation failures (5xx or validation errors): alert P1 when > 5 failures/minute for 5 minutes.
- Webhook processing errors: alert P1 when > 3 failed webhooks/minute for 10 minutes.
- Reconciliation mismatch rate: alert P1 when mismatch rate > 0.1% over 24h.
- High latency: alert P2 when p95 payment initiation > 2s for 10m.
- Provider outage: alert P1 when provider status API reports outage or health check fails.

What to check first
-------------------
1. Check dashboard (Grafana): payment_errors, webhook_errors, reconciliation_mismatch_rate, payment_latency_p95.
2. Open Sentry for recent errors; examine stack traces and user metadata.
3. Check provider status pages (NOWPayments / Coinbase) and the provider integration logs.
4. Inspect recent webhook deliveries (timestamps, signatures) and DB transaction states.

Immediate remediation steps
--------------------------
- If webhook signature validation fails: confirm provider signing key rotated; update secret and re-run webhook replay for failed events.
- If provider outage: enable maintenance mode for payments and inform customers via status page.
- If persistent processing error in our code: rollback the last deployment to the previous tag and create an incident ticket.

Escalation & Communication
--------------------------
- Escalate to on-call backend engineer for P1 within 15 minutes.
- Post incident update in `#incidents` Slack channel with summary, impact, and mitigation steps.

Post-incident
-------------
- Run reconciliation for affected time window.
- Create post-mortem with RCA and action items; add to `docs/runbooks/postmortems/`.

***

