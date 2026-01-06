#!/usr/bin/env ts-node
import axios from 'axios';
import crypto from 'crypto';

if (!process.env.MAILCOW_API_URL || !process.env.MAILCOW_API_KEY) {
  console.error('Missing MAILCOW_API_URL or MAILCOW_API_KEY in environment.');
  process.exit(2);
}

async function createMailbox(email: string) {
  const [local_part, domain] = email.split('@');
  if (!local_part || !domain) {
    throw new Error('Email must be in the form local@domain');
  }

  const password = crypto.randomBytes(12).toString('base64');

  const payload = {
    domain,
    local_part,
    name: local_part,
    quota: 2048,
    password,
  };

  const url = `${process.env.MAILCOW_API_URL}/add/mailbox`;

  const headers = {
    'X-API-Key': process.env.MAILCOW_API_KEY!,
    'Content-Type': 'application/json',
  };

  try {
    const res = await axios.post(url, payload, { headers, timeout: 15000 });
    if (res.data && res.status >= 200 && res.status < 300) {
      console.log(JSON.stringify({ email, password, result: res.data }, null, 2));
      return { email, password, result: res.data };
    }
    throw new Error(`Unexpected response: ${res.status}`);
  } catch (err: any) {
    console.error('Create mailbox failed:', err?.response?.data || err.message || err);
    throw err;
  }
}

(async () => {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: pnpm create:mailbox support@<your-domain>');
    process.exit(1);
  }
  try {
    await createMailbox(email);
    process.exit(0);
  } catch {
    process.exit(3);
  }
})();
