import assert from 'assert'
import { parse } from 'url'
import grantNow from './index.js'

const providers = {
  google: {
    scope: ["openid"],
    key: process.env.GOOGLE_KEY,
    secret: process.env.GOOGLE_SECRET,
  },
  tumblr: {
    key: process.env.TUMBLR_KEY,
    secret: process.env.TUMBLR_SECRET,
  },
}

it('results', () => {
  const port = 5000

  return grantNow({ port, open: false, ...providers }).then(results =>
    Object.keys(providers).forEach((key, index) => {
      const result = results[key]
      assert.equal(parse(result.connect_url).port, port + index)
      assert.ok(typeof result.server.close === 'function')
    })
  )
})