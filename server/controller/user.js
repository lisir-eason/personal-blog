/**
 * @description user的controller
 */

const { getUserInfo, createUser } = require('../services/user')
const { userIsNotExist, userIsExist, createUserFailed } = require('../model/errNum')
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

module.exports = {
  isExist,
  register,
}