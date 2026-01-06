import nodemailer from 'nodemailer';
import { emitLog, emitMetric } from '../../apps/operator/src/lib/observability';

const host = process.env.SMTP_HOST || 'mail.<your-domain>';
const port = Number(process.env.SMTP_PORT || '587');
const user = process.env.SMTP_USER || 'no-reply@<your-domain>';
const pass = process.env.SMTP_PASS || '';
const fromDefault = process.env.SMTP_FROM || user;

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2',
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
});

async function sendMail(opts: nodemailer.SendMailOptions) {
  try {
    const info = await transporter.sendMail(opts);
    emitLog('email.sent', { to: opts.to, subject: opts.subject, messageId: info.messageId });
    emitMetric('email.sent', 1, { type: String(opts.subject) });
    return info;
  } catch (err: any) {
    emitLog('email.error', { to: opts.to, subject: opts.subject, error: err.message || err });
    emitMetric('email.failed', 1, { type: String(opts.subject) });
    throw err;
  }
}

export async function sendVerificationEmail(to: string, token: string) {
  const base = process.env.WEBSITE_URL || 'https://buildwithai.digital';
  const link = `${base}/verify?token=${encodeURIComponent(token)}`;
  const subject = 'Verify your Build With AI account';
  const html = `<p>Click the link below to verify your email and complete onboarding:</p><p><a href="${link}">${link}</a></p>`;
  const text = `Verify your account: ${link}`;
  return sendMail({ from: fromDefault, to, subject, text, html });
}

export async function sendWelcomeEmail(to: string, name?: string) {
  const subject = 'Welcome to Build With AI';
  const html = `<p>Welcome${name ? ' ' + name : ''} — you're all set.</p>`;
  const text = `Welcome${name ? ' ' + name : ''} — you're all set.`;
  return sendMail({ from: fromDefault, to, subject, text, html });
}

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const subject = 'Reset your Build With AI password';
  const html = `<p>Reset your password using the link below:</p><p><a href="${resetLink}">${resetLink}</a></p>`;
  const text = `Reset your password: ${resetLink}`;
  return sendMail({ from: fromDefault, to, subject, text, html });
}

export async function sendOperatorEscalationEmail(to: string, data: {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  context?: any;
}) {
  const subject = `[Escalation][${data.severity}] ${data.type}`;
  const html = `<p><strong>Type:</strong> ${data.type}</p><p><strong>Severity:</strong> ${data.severity}</p><p><strong>Message:</strong> ${data.message}</p><pre>${JSON.stringify(data.context || {}, null, 2)}</pre>`;
  const text = `Type: ${data.type}\nSeverity: ${data.severity}\nMessage: ${data.message}\nContext: ${JSON.stringify(data.context || {}, null, 2)}`;
  return sendMail({ from: fromDefault, to, subject, text, html });
}

export async function sendDailyDigestEmail(to: string, summary: {
  date: string;
  total_checkouts: number;
  successful_payments: number;
  total_refunds: number;
  webhook_failures: number;
  reconciliation_mismatches: number;
  new_users: number;
}) {
  const subject = `Daily Digest — ${summary.date}`;
  const html = `<h3>Daily Digest for ${summary.date}</h3><ul>
    <li>Total checkouts: ${summary.total_checkouts}</li>
    <li>Successful payments: ${summary.successful_payments}</li>
    <li>Total refunds: ${summary.total_refunds}</li>
    <li>Webhook failures: ${summary.webhook_failures}</li>
    <li>Reconciliation mismatches: ${summary.reconciliation_mismatches}</li>
    <li>New users: ${summary.new_users}</li>
  </ul>`;
  const text = `Daily Digest ${summary.date}\nTotal checkouts: ${summary.total_checkouts}\nSuccessful payments: ${summary.successful_payments}\nTotal refunds: ${summary.total_refunds}\nWebhook failures: ${summary.webhook_failures}\nReconciliation mismatches: ${summary.reconciliation_mismatches}\nNew users: ${summary.new_users}`;
  return sendMail({ from: fromDefault, to, subject, text, html });
}

export default {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendOperatorEscalationEmail,
  sendDailyDigestEmail,
};
