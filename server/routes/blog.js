const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')
const {createBlog} = require('../controller/blog')


router.prefix('/blogs')

router.post('/createBlog', loginCheck, async (ctx, next) => {
  const {title, tags, htmlContent, rawContent} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await createBlog({userId, title, tags: tags.join(','), htmlContent, rawContent})
})

module.exports = router
