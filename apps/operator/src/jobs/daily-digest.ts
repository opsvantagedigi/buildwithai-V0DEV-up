import { query } from '@/lib/db';
import { sendDailyDigestEmail } from '../../../../libs/email/src/index';
import { emitMetric } from '@/lib/observability';

export async function runDailyDigestJob(date?: string) {
  const day = date || new Date().toISOString().slice(0, 10);

  const totalCheckoutsRes = await query(`SELECT COUNT(*) FROM transactions WHERE DATE(created_at) = $1`, [day]);
  const successfulRes = await query(`SELECT COUNT(*) FROM transactions WHERE DATE(created_at) = $1 AND status = 'confirmed'`, [day]);
  const refundsRes = await query(`SELECT COUNT(*) FROM refunds WHERE DATE(created_at) = $1`, [day]);
  const webhookFailuresRes = await query(`SELECT COUNT(*) FROM webhook_events WHERE DATE(received_at) = $1 AND (payload->>'error') IS NOT NULL`, [day]);
  const mismatchesRes = await query(`SELECT COUNT(*) FROM reconciliation_records WHERE date = $1 AND accounting_status = 'amount_mismatch'`, [day]);
  const newUsersRes = await query(`SELECT COUNT(*) FROM users WHERE DATE(created_at) = $1`, [day]);

  const summary = {
    date: day,
    total_checkouts: Number(totalCheckoutsRes.rows[0].count),
    successful_payments: Number(successfulRes.rows[0].count),
    total_refunds: Number(refundsRes.rows[0].count),
    webhook_failures: Number(webhookFailuresRes.rows[0].count),
    reconciliation_mismatches: Number(mismatchesRes.rows[0].count),
    new_users: Number(newUsersRes.rows[0].count),
  };

  emitMetric('daily_digest.generated', 1, { date: day });

  // Send to operator list
  const operatorEmail = process.env.OPERATOR_ALERT_EMAIL || 'operator@<your-domain>';
  await sendDailyDigestEmail(operatorEmail, summary);

  return summary;
}
