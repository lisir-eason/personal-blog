const {Comment, User} = require('../db/model/index')

const createComment = async ({userId, blogId, content, replyToId}) => {
  const result = await Comment.create({userId, blogId, content, replyToId})
  return result.dataValues
}

const getComments = async ({blogId, commentId}) => {
  const where = {}
  if (blogId) {
    where.blogId = blogId
  }
  if (commentId) {
    where.id = commentId
  }
  const result = await Comment.findAll({
    where,
    order: [
      ['updatedAt', 'DESC']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  if (!result.length) {
    return result
  }

  return result.map(item => {
    const {createdAt, id, content, replyToId, userId} = item.dataValues
    const {userName, nickName, picture,} = item.dataValues.User.dataValues
    return {
      createdAt, id, content, replyToId, userId, userName, nickName, picture,
    }
  })
}


module.exports = {
  createComment,
  getComments,
}