const router = require('koa-router')()
const loginCheck = require('../middlewares/loginCheck')
const {followPeople, isFollow, getFollower, removeFollow} = require('../controller/user-relation')


router.prefix('/userRelation')

router.post('/follow', loginCheck, async function (ctx, next) {
  const {userId} = ctx.query
  ctx.body = await followPeople(ctx, parseInt(userId, 10))
})

router.post('/unFollow', loginCheck, async function (ctx, next) {
  const {userId} = ctx.query
  ctx.body = await removeFollow(ctx, parseInt(userId, 10))
})

router.get('/isFollow', loginCheck, async function (ctx, next) {
  const {userId} = ctx.query
  ctx.body = await isFollow(ctx, parseInt(userId, 10))
})

router.get('/getFollower', async function (ctx, next) {
  const {userName} = ctx.query
  ctx.body = await getFollower(userName)
})


module.exports = router