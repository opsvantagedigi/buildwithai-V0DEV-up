const { exec } = require('child_process')
const path = require('path')

test('payments smoke script completes', (done) => {
  const script = path.join(__dirname, '../../scripts/payments-integration-test.js')
  const env = Object.assign({}, process.env, { PAYMENTS_PROVIDER_SECRET: 'test_secret' })
  exec(`node "${script}"`, { env, maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
    if (err) {
      console.error(stderr)
      return done(err)
    }
    try {
      expect(stdout).toMatch(/All payments smoke tests completed/)
      done()
    } catch (e) {
      done(e)
    }
  })
})
