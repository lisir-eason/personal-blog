const router = require('koa-router')()
const { isExist, register, login, logout,
  getCurrentUserInfo, changeUserInfo, changePassword} = require('../controller/user')
const genValidate = require('../middlewares/validate')
const loginCheck = require('../middlewares/loginCheck')
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

router.post('/login', async function (ctx, next) {
  const { userName, password, } = ctx.request.body
  ctx.body = await login({userName, password: encryptFn(password), ctx})
})

router.post('/logout', async function (ctx, next) {
  ctx.body = await logout(ctx)
})

router.post('/currentUser', loginCheck, async function (ctx, next) {
  ctx.body = await getCurrentUserInfo(ctx)
})

router.post('/updateUserInfo', loginCheck, async (ctx, next) => {
  const {nickName, gender, city, picture} = ctx.request.body
  ctx.body = await changeUserInfo(ctx, {nickName, gender, city, picture})
})

router.post('/changePassword', loginCheck, async (ctx, next) => {
  const {password, newPassword} = ctx.request.body
  ctx.body = await changePassword(ctx,
    {
      password: encryptFn(password),
      newPassword: encryptFn(newPassword)
    })
})

module.exports = router
