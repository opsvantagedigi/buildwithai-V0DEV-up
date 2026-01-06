#!/usr/bin/env ts-node
import axios from 'axios';
import crypto from 'crypto';
import fs from 'fs-extra';
import path from 'path';

const MAILS = [
  'support@<your-domain>',
  'payments@<your-domain>',
  'operator@<your-domain>',
  'no-reply@<your-domain>',
  'marz@<your-domain>',
];

if (!process.env.MAILCOW_API_URL || !process.env.MAILCOW_API_KEY) {
  console.error('Missing MAILCOW_API_URL or MAILCOW_API_KEY in environment.');
  process.exit(2);
}

const headers = {
  'X-API-Key': process.env.MAILCOW_API_KEY!,
  'Content-Type': 'application/json',
};

async function mailboxExists(local: string, domain: string) {
  try {
    const res = await axios.get(`${process.env.MAILCOW_API_URL}/get/mailbox/all`, {
      headers,
      timeout: 15000,
    });
    const list = res.data?.data || res.data || [];
    return list.some((m: any) => m.mailbox === `${local}@${domain}`);
  } catch (err) {
    console.error('Failed to fetch mailbox list:', err?.message || err);
    throw err;
  }
}

async function createIfMissing(email: string) {
  const [local, domain] = email.split('@');
  if (await mailboxExists(local, domain)) {
    console.log(`Mailbox exists: ${email}`);
    return null;
  }
  const password = crypto.randomBytes(16).toString('base64');
  const payload = {
    domain,
    local_part: local,
    name: local,
    quota: 2048,
    password,
  };
  try {
    const res = await axios.post(`${process.env.MAILCOW_API_URL}/add/mailbox`, payload, { headers, timeout: 15000 });
    console.log(`Created mailbox ${email}`);
    return { email, password, result: res.data };
  } catch (err: any) {
    console.error(`Failed to create ${email}:`, err?.response?.data || err.message || err);
    throw err;
  }
}

async function main() {
  const created: any[] = [];
  for (const e of MAILS) {
    const result = await createIfMissing(e);
    if (result) created.push(result);
  }

  if (created.length > 0) {
    const out = path.join(process.cwd(), 'tmp', 'mailcow-created.json');
    await fs.mkdirp(path.dirname(out));
    await fs.writeFile(out, JSON.stringify(created, null, 2));
    console.log(`Wrote created mailbox credentials to ${out}`);
  } else {
    console.log('No new mailboxes created.');
  }
}

main().catch(err => {
  console.error('Provisioning failed:', err);
  process.exit(20);
});
