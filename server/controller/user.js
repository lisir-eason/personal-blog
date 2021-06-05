/**
 * @description user的controller
 */

const { getUserInfo, createUser, updateUser } = require('../services/user')
const {
  userIsNotExist,
  userIsExist,
  createUserFailed,
  passwordOrUserNameError,
  updateUserInfoError,
  changePasswordError
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

async function getCurrentUserInfo(ctx) {
  const {userInfo} = ctx.session
  if (userInfo) {
    return new SuccessModal({data: userInfo})
  }
}

async function changeUserInfo(ctx, {nickName, gender, city, picture}) {
  const {userName} = ctx.session.userInfo
  const newData = {nickName, gender, city, picture}
  const where = {
    userName
  }
  const result = await updateUser(newData, where)

  if (result) {
    const newUserInfo = {...ctx.session.userInfo, nickName, gender, city, picture}
    ctx.session.userInfo = newUserInfo
    return new SuccessModal({data: newUserInfo})
  }
  return new ErrorModal(updateUserInfoError)
}

async function changePassword(ctx, {password, newPassword}) {
  const {userName} = ctx.session.userInfo
  const userInfo = await getUserInfo({userName, password})
  if (!userInfo) {
    return new ErrorModal(changePasswordError)
  }
  const newData = {password: newPassword}
  const where = {userName: userInfo.userName}

  const result = await updateUser(newData, where)
  if (result) {
    return new SuccessModal({data: '更新密码成功'})
  }
  return new ErrorModal(updateUserInfoError)
}

module.exports = {
  isExist,
  register,
  login,
  logout,
  getCurrentUserInfo,
  changeUserInfo,
  changePassword,
}