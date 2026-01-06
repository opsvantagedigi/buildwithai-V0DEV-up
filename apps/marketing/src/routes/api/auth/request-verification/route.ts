import { z } from 'zod';
import crypto from 'crypto';
import { query } from '@/lib/db';
import { sendVerificationEmail } from 'libs/email/src/index';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const input = schema.parse(body);
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(); // 24h

  await query(
    `INSERT INTO email_verification_tokens (email, token, expires_at, used, created_at)
     VALUES ($1, $2, $3, FALSE, NOW())`,
    [input.email, token, expiresAt]
  );

  try {
    await sendVerificationEmail(input.email, token);
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'failed_to_send_email', detail: err.message || String(err) }), { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
