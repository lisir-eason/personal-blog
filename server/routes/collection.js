const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')
const {getUserCollections, createUserCollection, updateUserCollection,
  createUserCollectBlog, getCurrentUserCollectBlogs, deleteUserCollection,
  deleteUserCollectBlog, getBlogCollect, deleteCollectBlogByBlogId,
} = require('../controller/collection')


router.prefix('/collection')

router.get('/getUserCollections', loginCheck, async function (ctx, next) {
  const {userId} = ctx.query
  ctx.body = await getUserCollections(userId)
})

router.post('/createCollection', loginCheck, async (ctx, next) => {
  const {collectionName} = ctx.request.body
  ctx.body = await createUserCollection(ctx, collectionName)
})

router.post('/createCollectBlog', loginCheck, async (ctx, next) => {
  const {blogId, collectionId} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await createUserCollectBlog({blogId, collectionId, userId})
})

router.get('/getCurrentUserCollectBlogs', loginCheck, async function (ctx, next) {
  ctx.body = await getCurrentUserCollectBlogs(ctx)
})

router.post('/updateCollection', loginCheck, async (ctx, next) => {
  const {collectId, collectionName} = ctx.request.body
  ctx.body = await updateUserCollection({collectId, collectionName})
})

router.post('/deleteCollection', loginCheck, async (ctx, next) => {
  const {collectId} = ctx.request.body
  ctx.body = await deleteUserCollection({collectId})
})

router.post('/deleteCollectBlog', loginCheck, async (ctx, next) => {
  const {collectId} = ctx.request.body
  ctx.body = await deleteUserCollectBlog({collectId})
})

router.post('/deleteCollectBlogByBlogId', loginCheck, async (ctx, next) => {
  const {blogId} = ctx.request.body
  const {id: userId} = ctx.session.userInfo
  ctx.body = await deleteCollectBlogByBlogId({blogId, userId})
})

router.get('/getBlogCollect', async (ctx, next) => {
  const {blogId} = ctx.query
  ctx.body = await getBlogCollect({blogId: parseInt(blogId, 10)})
})

module.exports = router