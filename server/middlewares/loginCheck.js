const {ErrorModal} = require('../model/resModal')
const {notLogin} = require('../model/errNum')


async function loginCheck(ctx, next) {
  if (!ctx.session.userInfo){
    ctx.body = new ErrorModal(notLogin)
    return
  }
  await next()
}

module.exports = loginCheck