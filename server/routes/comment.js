const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')
const {
  createNewComment, getBlogComment,
} = require('../controller/comment')


router.prefix('/comment')

router.post('/createComment', loginCheck, async function (ctx, next) {
  const {id: userId} = ctx.session.userInfo
  const {blogId, content, replyToId} = ctx.request.body
  ctx.body = await createNewComment({userId, blogId, content, replyToId})
})

router.get('/getBlogComment', async function (ctx, next) {
  const {blogId} = ctx.query
  ctx.body = await getBlogComment({blogId})
})

module.exports = router