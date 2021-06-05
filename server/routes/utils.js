const router = require('koa-router')()
const {uploadFile} = require('../controller/utils')
const loginCheck = require('../middlewares/loginCheck')

router.prefix('/utils')

router.post('/upload', loginCheck, async function (ctx, next) {
  const file = ctx.request.files.file
  ctx.body = await uploadFile(ctx, file)
})

module.exports = router
