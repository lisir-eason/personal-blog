/**
 * @description 验证中间件
 */

const {jsonSchemaFileInfo} = require('../model/errNum')
const { ErrorModal } = require('../model/resModal')
const { paramsError } = require('../model/errNum')


function genValidate(validateFn, params) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const err = validateFn(data)
    let hasUndefined = false
    //参数个数验证
    if (params) {
      params.map(parm => {
        if (!data[parm]) {
          hasUndefined = true
        }
      })
    }
    if (hasUndefined) {
      ctx.response.status = 400
      ctx.body = new ErrorModal(paramsError)
      return
    } else if (err) {
      ctx.body = new ErrorModal(jsonSchemaFileInfo)
      return
    }
    await next()
  }

  return validator
}

module.exports = genValidate