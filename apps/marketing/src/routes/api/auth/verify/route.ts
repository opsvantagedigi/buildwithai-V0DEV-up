import { query } from '@/lib/db';
import { sendWelcomeEmail } from 'libs/email/src/index';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  if (!token) return new Response('Missing token', { status: 400 });

  const res = await query(
    `SELECT * FROM email_verification_tokens WHERE token = $1 LIMIT 1`,
    [token]
  );

  const row = res.rows[0];
  if (!row) return new Response('Invalid token', { status: 400 });
  if (row.used) return new Response('Token already used', { status: 400 });
  if (new Date(row.expires_at) < new Date()) return new Response('Token expired', { status: 400 });

  // Mark used and create user if not exists
  await query(`UPDATE email_verification_tokens SET used = TRUE WHERE id = $1`, [row.id]);

  const existing = await query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [row.email]);
  if (!existing.rows[0]) {
    await query(`INSERT INTO users (email, created_at) VALUES ($1, NOW())`, [row.email]);
  }

  try {
    await sendWelcomeEmail(row.email);
  } catch {}

  // Redirect to onboarding
  const redirectTo = process.env.WEBSITE_URL ? `${process.env.WEBSITE_URL}/onboarding` : '/onboarding';
  return Response.redirect(redirectTo, 302);
}
