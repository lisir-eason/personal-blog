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
    errno: 10012,
    message: '获取用户博客失败！'
  },
  getHomeBlogFailed: {
    errno: 10013,
    message: '获取首页博客失败！'
  },
  noAccessToUpdateBlog: {
    errno: 10014,
    message: '您不是作者，无法编辑此文章！'
  },
  updateBlogFailed: {
    errno: 10015,
    message: '更新博客失败！'
  },
  followFailed: {
    errno: 10016,
    message: '关注失败！'
  },
  noFollowRelation: {
    errno: 10017,
    message: '没有关注此用户！'
  },
  getFollowerFailed: {
    errno: 10018,
    message: '获取粉丝失败'
  },
  unFollowFailed: {
    errno: 10019,
    message: '取消关注失败！'
  },
  getLikerFailed: {
    errno: 10020,
    message: '获取喜欢博客的人失败！'
  },
  likeBlogFailed: {
    errno: 10021,
    message: '喜欢博客失败！'
  },
  unlikeBlogFailed: {
    errno: 10022,
    message: '取消喜欢博客失败！'
  },
  createCollectionFailed: {
    errno: 10022,
    message: '创建收藏夹失败！'
  },
  createCollectBlogFailed: {
    errno: 10022,
    message: '收藏微博失败！'
  },
  updateCollectionFailed: {
    errno: 10023,
    message: '更新文件夹名失败！'
  },
  deleteCollectionFailed: {
    errno: 10024,
    message: '删除文件夹失败！'
  },
  deleteCollectBlogFailed: {
    errno: 10025,
    message: '取消收藏失败！'
  },
  deleteBlogFailed: {
    errno: 10026,
    message: '删除微博失败！'
  },
  getFocusFailed: {
    errno: 10027,
    message: '获取关注列表失败！'
  },
  createCommentFailed: {
    errno: 10028,
    message: '评论失败！'
  },
  getNotificationFailed: {
    errno: 10029,
    message: '获取通知失败！'
  },
  updateNotificationFailed: {
    errno: 10030,
    message: '更新通知失败！'
  },
}