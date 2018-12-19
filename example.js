require('dotenv/config')
require('./index.js')({
  protocol: 'http',
  port: 3000,
  open: true,
  google: {
    scope: ["openid"],
    key: process.env.GOOGLE_KEY,
    secret: process.env.GOOGLE_SECRET,
  },
  tumblr: {
    key: process.env.TUMBLR_KEY,
    secret: process.env.TUMBLR_SECRET,
  },
})