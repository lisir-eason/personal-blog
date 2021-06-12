const {createLiker, deleteLiker,} = require('../services/like-relation')

const {
  likeBlogFailed,
} = require('../model/errNum')
const { SuccessModal, ErrorModal } = require('../model/resModal')


const userLikeBlog = async (ctx, {blogId}) => {
  const {id: userId} = ctx.session.userInfo
  const result = await createLiker({userId, blogId})
  if (result) {
    return new SuccessModal({data: result})
  }
  return new ErrorModal(likeBlogFailed)
}

const userUnlikeBlog = async (ctx, {blogId}) => {
  const {id: userId} = ctx.session.userInfo
  const result = await deleteLiker({userId, blogId})
  if (result) {
    return new SuccessModal({data: '取消喜欢成功'})
  }
  return new ErrorModal(unlikeBlogFailed)
}

module.exports = {
  userLikeBlog,
  userUnlikeBlog,
}


