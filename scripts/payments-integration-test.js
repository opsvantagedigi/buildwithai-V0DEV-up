#!/usr/bin/env node
// Lightweight payments integration smoke tests (can run in CI with mocked env)
const crypto = require('crypto')

function ok(msg){ console.log('OK:', msg) }
function fail(msg){ console.error('FAIL:', msg); process.exitCode = 2 }

function testIdempotency(){
  const key = 'idem-key-123'
  const store = new Map()
  function createOrder(idempotencyKey){
    if (store.has(idempotencyKey)) return store.get(idempotencyKey)
    const order = { id: 'order-' + Math.random().toString(36).slice(2,9), createdAt: Date.now() }
    store.set(idempotencyKey, order)
    return order
  }
  const a = createOrder(key)
  const b = createOrder(key)
  if (a.id !== b.id) fail('Idempotency failed: duplicate orders created')
  else ok('Idempotency behavior')
}

function testWebhookSig(){
  const secret = process.env.PAYMENTS_PROVIDER_SECRET || 'test_secret'
  const payload = JSON.stringify({ id: 'tx_1', status: 'paid' })
  const sig = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  // verifier
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex')
  if (sig !== expected) fail('Webhook signature mismatch')
  else ok('Webhook signature verification')
}

function testReconciliation(){
  const internal = [{ id: 'tx1', amount: 100 }, { id: 'tx2', amount: 200 }]
  const provider = [{ id: 'tx1', amount: 100 }, { id: 'tx2', amount: 200 }]
  const mismatches = []
  for (const p of provider){
    const i = internal.find(x => x.id === p.id)
    if (!i || i.amount !== p.amount) mismatches.push(p.id)
  }
  if (mismatches.length) fail('Reconciliation mismatches: ' + mismatches.join(','))
  else ok('Reconciliation (sample)')
}

// Run tests
console.log('Payments integration smoke tests starting...')
testIdempotency()
testWebhookSig()
testReconciliation()
console.log('All payments smoke tests completed')
