const {createComment, getComments,} = require('../services/comment')
const {createNotification} = require('../services/notification')
const {getBlogInfo} = require('../services/blog')
const {
  createCommentFailed,
} = require('../model/errNum')
const { SuccessModal, ErrorModal } = require('../model/resModal')


const createNewComment = async ({userId, blogId, content, replyToId}) => {
  const result = await createComment({userId, blogId, content, replyToId})
  if ( replyToId === 0 ) {
    const blogInfo = await getBlogInfo({id: blogId})
    await createNotification({userId: blogInfo.user.id, type: 2, content, creatorId: userId, blogId,})
  } else {
    const commentInfo = await getComments({commentId: replyToId})
    if (commentInfo[0].userId !== userId) {
      await createNotification({userId: commentInfo[0].userId, type: 3, content, creatorId: userId, blogId,})
    }
  }

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


