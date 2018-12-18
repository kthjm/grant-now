const Koa = require('koa')
const app2mw = require('koa-mount')
const Session = require('koa-session')
const Grant = require('grant-koa')
const Router = require('koa-router')
const opn = require('opn')

/**
 * Why build server by provider?
 * grant@4.2.2
 * - https://github.com/simov/grant/blob/master/lib/consumer/koa2.js?fbclid=IwAR0iqemny9Kyeb-9A9OApOpIYkIyHKg6jwKgSoEbLG2KfgmtyGKZINqUn4U#L30-L63
 * - https://github.com/simov/grant/blob/master/lib/config.js?fbclid=IwAR1oq9JNOPYly-iWDrdTIZ1wrhwf3KhGKBOMAN2WKHgRwmYSGWxChaZ0f0o#L153-#L189
 */

const PROTOCOL = 'http'
const PORT = 7000

const assign = (objects) => Object.assign({}, ...objects)

const createApp = ({ name, config, ...defaults }) => {
  const app = new Koa()
  const callback = '/view'
  const sessionKey = `grant_now:sess:${name}` // !

  const session = Session({ key: sessionKey, maxAge: 'session', signed: false }, app)

  const grant = Grant({ defaults, [name]: { ...config, callback } })

  const router = Router().get(callback, (ctx) => {
    ctx.cookies.set(sessionKey)
    ctx.body = `${name}: ${JSON.stringify(ctx.query, null, ' ')}`
  })

  return app
  .use(session)
  .use(app2mw(grant))
  .use(router.routes())
}

module.exports = ({
  protocol = PROTOCOL,
  port: basePort = PORT,
  open = true,
  ...providers
}) =>
  Promise.all(Object.entries(providers).map(([ name, config ], index) => {
    const port = basePort + index
    const host = `localhost:${port}`
    const result = {
      name,
      url: `${protocol}://${host}/connect/${name}`,
      server: undefined,
    }

    console.log(`- ${result.url}`)
    if (open) opn(result.url, { wait: false })

    return new Promise(resolve =>
      result.server = createApp({ name, config, protocol, host }).listen(port, resolve)
    ).then(() => result)
  }))
  .then(results =>
    assign(results.map(({ name, ...result }) => ({ [name]: result })))
  )