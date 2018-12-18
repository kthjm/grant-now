import assert from 'assert'
import { parse } from 'url'
import grantNow from './index.js'

const {
  GOOGLE_KEY,
  GOOGLE_SECRET,
  TUMBLR_KEY,
  TUMBLR_SECRET,
} = process.env

const providers = {
  google: {
    key: GOOGLE_KEY,
    secret: GOOGLE_SECRET,
    nonce: true,
    scope: ["openid"],
  },
  tumblr: {
    key: TUMBLR_KEY,
    secret: TUMBLR_SECRET,
  },
}

it('results', () => {
  const port = 5000

  return grantNow({ port, open: false, ...providers }).then(results =>
    Object.keys(providers).forEach((key, index) => {
      const result = results[key]
      assert.equal(parse(result.url).port, port + index)
      assert.ok(typeof result.server.close === 'function')
    })
  )
})