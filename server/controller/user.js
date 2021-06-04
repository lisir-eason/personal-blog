/**
 * @description user的controller
 */

const { getUserInfo, createUser } = require('../services/user')
const {
  userIsNotExist,
  userIsExist,
  createUserFailed,
  passwordOrUserNameError
} = require('../model/errNum')
const { SuccessModal, ErrorModal } = require('../model/resModal')

async function isExist ({userName}) {
  const userInfo = await getUserInfo({userName})
  if ( userInfo ) {
    return new SuccessModal({data: userInfo})
  }
  return new ErrorModal(userIsNotExist)
}

async function register({userName, password}) {
  const userInfo = await getUserInfo({userName})
  if ( userInfo ) {
    return new ErrorModal(userIsExist)
  }
  try {
    const user = await createUser({userName, password})
    return new SuccessModal({data: user})
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModal(createUserFailed)
  }
}

async function login({userName, password, ctx}) {
  const userInfo = await getUserInfo({userName, password})
  if (userInfo) {
    ctx.session.userInfo = userInfo
    return new SuccessModal({data: userInfo})
  }
  return new ErrorModal(passwordOrUserNameError)
}

async function logout(ctx) {
  try {
    ctx.session = null
    return new SuccessModal({data: {}})
  } catch (error) {
    console.error(error.message, error.stack)
  }
}

module.exports = {
  isExist,
  register,
  login,
  logout,
}