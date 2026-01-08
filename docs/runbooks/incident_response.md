Runbook: Payments Incident Response
===================================

Scope
-----
Incident response for production payment incidents (failed settlements, mass webhook failures, fraudulent spikes).

Steps
-----
1. Triage & classify impact
   - Identify affected customers / transactions via DB query.
   - Estimate scope and revenue impact.
2. Containment
   - If code bug: revert the offending deployment.
   - If provider issue: switch to fallback provider (if safe) or pause payment acceptance.
3. Mitigation
   - Re-run failed webhooks using provider replay where available.
   - Trigger manual reconciliation for impacted window.
4. Communication
   - Notify stakeholders and customers as required; update status page with ETA.
   - Provide short-form incident notes every 30 minutes until resolved.
5. Recovery
   - Confirm normal operations via metrics and reconciliation success.
6. Postmortem
   - Document timeline, root cause, and action items in `docs/runbooks/postmortems/`.

Contact & Escalation
--------------------
- On-call Backend: PagerDuty (primary)
- Payments lead: engineering manager
- Product & Ops: ops@example.com
- Legal/compliance: compliance@example.com

Tools
-----
- Sentry, Grafana, Postgres, Redis, Vercel, Provider dashboards (NOWPayments / Coinbase).

***
