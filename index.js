const Koa = require('koa')
const app2mw = require('koa-mount')
const Session = require('koa-session')
const Grant = require('grant-koa')
const Router = require('koa-router')
const opn = require('opn')

/**
 * Why build server by provider?
 * grant@4.2.2
 * - https://github.com/simov/grant/blob/e138c15413fae59aa4f61fefef161c4dd7816782/lib/consumer/koa2.js#L30-L63
 * - https://github.com/simov/grant/blob/e138c15413fae59aa4f61fefef161c4dd7816782/lib/config.js#L153-#L189
 */

const PROTOCOL = 'http'
const PORT = 7000
const CALLBACK = '/view'

const assign = (objects) => Object.assign({}, ...objects)

const createApp = ({ name, config, ...defaults }) => {
  const app = new Koa()
  const callback = CALLBACK
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
      connect_url: `${protocol}://${host}/connect/${name}`,
      server: undefined,
    }

    console.log(`- ${result.connect_url}`)
    if (open) opn(result.connect_url, { wait: false })

    return new Promise(resolve =>
      result.server = createApp({ name, config, protocol, host }).listen(port, resolve)
    ).then(() => result)
  }))
  .then(results =>
    assign(results.map(({ name, ...result }) => ({ [name]: result })))
  )