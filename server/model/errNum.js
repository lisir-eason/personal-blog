/**
 * @description 维护错误代码
 */

module.exports = {
  userIsNotExist: {
    errno: 10001,
    message: '用户名不存在'
  },
  createUserFailed: {
    errno: 10002,
    message: '创建用户失败'
  },
  jsonSchemaFileInfo: {
    errno: 10003,
    message: '数据格式校验错误'
  },
  userIsExist: {
    errno: 10004,
    message: '用户名已存在'
  },
  paramsError: {
    errno: 10005,
    message: '参数不正确'
  },
  passwordOrUserNameError: {
    errno: 10006,
    message: '用户名或者密码不正确'
  },
  notLogin: {
    errno: 10007,
    message: '没有登陆！'
  },
  updateUserInfoError: {
    errno: 10008,
    message: '更新用户信息失败！'
  },
  changePasswordError: {
    errno: 10009,
    message: '原密码错误！'
  },
  createBlogFailed: {
    errno: 10010,
    message: '创建博客失败！'
  },
  getBlogInfoFailed: {
    errno: 10011,
    message: '获取的博客不存在！'
  },
  getUserBlogFailed: {
    errno: 10011,
    message: '获取用户博客失败'
  },
  getHomeBlogFailed: {
    errno: 10012,
    message: '获取首页博客失败'
  },
}