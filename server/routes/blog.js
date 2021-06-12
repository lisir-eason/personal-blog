const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')
const {createBlog, getBlog, getBlogByUser, getHomePageBlogList,
  updateBlog, increaseViewCount, getBlogLiker,} = require('../controller/blog')
const {userLikeBlog, userUnlikeBlog} = require('../controller/like-relation')

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

router.post('/updateBlog', loginCheck, async(ctx, next) => {
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

router.post('/increaseViewCount', async(ctx, next) => {
  const {id,} = ctx.request.body
  ctx.body = await increaseViewCount({id: parseInt(id, 10)})
})

router.get('/getLiker', async (ctx, next) => {
  const {blogId} = ctx.query
  ctx.body = await getBlogLiker({blogId: parseInt(blogId, 10)})
})

router.post('/userLikeBlog', loginCheck, async(ctx, next) => {
  const {id,} = ctx.request.body
  ctx.body = await userLikeBlog(ctx, {blogId: parseInt(id, 10)})
})

router.post('/unLikeBlog', loginCheck, async(ctx, next) => {
  const {id,} = ctx.request.body
  ctx.body = await userUnlikeBlog(ctx, {blogId: parseInt(id, 10)})
})

module.exports = router
