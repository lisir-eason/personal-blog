const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-session')
const koaBody = require('koa-body')

const users = require('./routes/users')
const blogs = require('./routes/blog')
const utils = require('./routes/utils')
const userRelation = require('./routes/user-relation')
const collection = require('./routes/collection')
// error handler
onerror(app)

// middlewares
app.use(cors())
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2*1024*1024 // 设置上传文件大小最大限制，默认2M
  }
}))
app.use(bodyparser({
  'enableTypes':['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  'extension': 'pug'
}))

app.keys = ['session-keys*li@ea']
const CONFIG = {
  key: 'koa.blog',
  maxAge: 7 * 24 *60 *60 * 1000,
  autoCommit: true,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false,
  secure: false,
  sameSite: null,
}

app.use(session(CONFIG, app))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(blogs.routes(), blogs.allowedMethods())
app.use(utils.routes(), utils.allowedMethods())
app.use(userRelation.routes(), userRelation.allowedMethods())
app.use(collection.routes(), collection.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
