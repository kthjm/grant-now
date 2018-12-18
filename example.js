require('dotenv').config()

const {
  GOOGLE_KEY,
  GOOGLE_SECRET,
  TUMBLR_KEY,
  TUMBLR_SECRET,
} = process.env

require('./index.js')({
  protocol: 'http',
  port: 3000,
  open: true,
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
})