On-call & PagerDuty — One-page
================================

Purpose
-------
Quick reference for on-call engineers and PagerDuty rotation for payment incidents.

On-call rotation
-----------------
- Primary on-call: Backend engineer (1 week)
- Secondary on-call: Payments lead (1 week)
- Escalation: Engineering manager

PagerDuty setup
---------------
- Service: `payments-production`
- Escalation policy: 3-minute initial notification, 10-minute re-alert, escalate to secondary after 15 minutes.

Alerting & Prioritization
-------------------------
- P1: Mass payment failures, provider outage, reconciliation mismatch > 0.1% over 24h.
- P2: High latency p95 > 2s, intermittent webhook drops.
- P3: Low-impact failures or informational alerts.

Runbook snippet
---------------
1. Acknowledge the alert in PagerDuty.
2. Check Grafana dashboards: payment_errors, webhook_errors, payment_latency_p95.
3. Check Sentry for recent exceptions and trace ids.
4. Check provider status page and provider dashboard.
5. If code-related, create a rollback PR or hotfix; if provider-related, switch to fallback or pause acceptance.

Communication
-------------
- Post updates to `#incidents` Slack channel every 30 minutes.
- Update status page with impact and ETA.

Contacts
--------
- On-call rotation: see PagerDuty schedule
- Payments lead: payments@example.com
- Ops: ops@example.com
