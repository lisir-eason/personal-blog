const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')
const {getCurrentUserNotification, readNotification,
  readNotificationByBlogId,
} = require('../controller/notification')


router.prefix('/notification')

router.get('/getCurrentUserNotification', loginCheck, async function (ctx, next) {
  const {id: userId} = ctx.session.userInfo
  ctx.body = await getCurrentUserNotification(userId)
})

router.post('/readNotification', loginCheck, async function (ctx, next) {
  const {id} = ctx.request.body
  ctx.body = await readNotification(parseInt(id, 10))
})

router.post('/readNotificationByBlogId', loginCheck, async function (ctx, next) {
  const {blogId} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await readNotificationByBlogId({userId, blogId: parseInt(blogId, 10)})
})


module.exports = router