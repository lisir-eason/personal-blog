const {createComment, getComments,} = require('../services/comment')
const {
  createCommentFailed,
} = require('../model/errNum')
const { SuccessModal, ErrorModal } = require('../model/resModal')


const createNewComment = async ({userId, blogId, content, replyToId}) => {
  const result = await createComment({userId, blogId, content, replyToId})
  if (result) {
    return new SuccessModal({data: result})
  }
  return new ErrorModal(createCommentFailed)
}

const getBlogComment = async ({blogId}) => {
  const result = await getComments({blogId})
  if (result) {
    return new SuccessModal({data: result})
  }
}

module.exports = {
  createNewComment,
  getBlogComment,
}


