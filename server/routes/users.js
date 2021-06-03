const router = require('koa-router')()
const { isExist, register } = require('../controller/user')
const genValidate = require('../middlewares/validate')
const userValidate = require('../validator/user')
const {encryptFn} = require('../utils/encrypt')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/isExist', async function (ctx, next) {
  const { userName } = ctx.request.body
  ctx.body = await isExist({userName})
})

router.post('/register', genValidate(userValidate, ['userName', 'password']), async function (ctx, next) {
  const { userName, password, } = ctx.request.body
  ctx.body = await register({userName, password: encryptFn(password)})
})

module.exports = router
