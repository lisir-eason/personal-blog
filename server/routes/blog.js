const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')
const {createBlog, getBlog, getBlogByUser, getHomePageBlogList, updateBlog} = require('../controller/blog')


router.prefix('/blogs')

router.post('/createBlog', loginCheck, async (ctx, next) => {
  const {title, tags, htmlContent, rawContent} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await createBlog({userId, title, tags: tags.join(','), htmlContent, rawContent})
})

router.get('/getBlog/:id', async (ctx, next) => {
  const id = ctx.params.id
  ctx.body = await getBlog({id})
})

router.post('/updateBlog', async(ctx, next) => {
  const {id, title, tags, htmlContent, rawContent} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await updateBlog({id, userId, title, tags: tags.join(','), htmlContent, rawContent})
})

router.get('/getUserBlog', async (ctx, nex) => {
  const userName = ctx.query.userName
  ctx.body = await getBlogByUser({userName})
})

router.get('/getHomePageBlog', async (ctx, nex) => {
  let {page, perPage} = ctx.query
  page = parseInt(page, 10)
  perPage = parseInt(perPage, 10)
  ctx.body = await getHomePageBlogList({page, perPage})
})

module.exports = router
