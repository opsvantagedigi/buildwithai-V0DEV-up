const http = require('http')
const crypto = require('crypto')

function signPayload(secret, payload) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex')
}

test('mock provider sends webhook and receiver verifies signature', (done) => {
  const providerSecret = 'test_secret'
  let received = null

  // Start webhook receiver server
  const receiver = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
      let body = ''
      req.on('data', (chunk) => body += chunk)
      req.on('end', () => {
        const sig = req.headers['x-provider-signature'] || req.headers['x-provider-signature'.toLowerCase()]
        const expected = signPayload(providerSecret, body)
        received = { body, sig, expected }
        res.writeHead(200)
        res.end('ok')
      })
      return
    }
    res.writeHead(404)
    res.end()
  })

  receiver.listen(0, () => {
    const receiverPort = receiver.address().port

    // Start mock provider server
    const provider = http.createServer((req, res) => {
      if (req.method === 'POST' && req.url === '/checkout') {
        // return a fake checkout URL that points back to the receiver
        const checkoutUrl = `http://localhost:${receiverPort}/webhook` // in real flow provider would redirect user
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ checkoutUrl }))
        return
      }

      if (req.method === 'POST' && req.url === '/trigger-webhook') {
        // provider triggers our webhook
        let body = ''
        req.on('data', c => body += c)
        req.on('end', () => {
          const payload = JSON.stringify({ id: 'tx-mock', status: 'paid', amount: 100 })
          const signature = signPayload(providerSecret, payload)
          const options = {
            hostname: 'localhost',
            port: receiverPort,
            path: '/webhook',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(payload),
              'X-Provider-Signature': signature,
            }
          }
          const r = http.request(options, (resp) => {
            let out = ''
            resp.on('data', (c) => out += c)
            resp.on('end', () => {
              res.writeHead(200)
              res.end('webhook-sent')
            })
          })
          r.write(payload)
          r.end()
        })
        return
      }

      res.writeHead(404)
      res.end()
    })

    provider.listen(0, async () => {
      const providerPort = provider.address().port

      // Simulate client calling provider checkout
      const post = http.request({ hostname: 'localhost', port: providerPort, path: '/checkout', method: 'POST' }, (r) => {
        let body = ''
        r.on('data', c => body += c)
        r.on('end', () => {
          const json = JSON.parse(body)
          expect(json.checkoutUrl).toContain('/webhook')

          // Trigger provider to send webhook
          const trigger = http.request({ hostname: 'localhost', port: providerPort, path: '/trigger-webhook', method: 'POST' }, (tr) => {
            let out = ''
            tr.on('data', c => out += c)
            tr.on('end', () => {
              // allow some time for receiver to process
              setTimeout(() => {
                try {
                  expect(received).not.toBeNull()
                  expect(received.sig).toEqual(received.expected)
                  provider.close()
                  receiver.close()
                  done()
                } catch (e) {
                  provider.close()
                  receiver.close()
                  done(e)
                }
              }, 50)
            })
          })
          trigger.end(JSON.stringify({ trigger: true }))
        })
      })
      post.end(JSON.stringify({ amount: 100 }))
    })
  })
})
