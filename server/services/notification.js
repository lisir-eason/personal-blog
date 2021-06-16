const {Notification, User, Blog,} = require('../db/model/index')

const createNotification = async ({
  userId, type, content, creatorId, blogId,
}) => {
  const options = {
    userId, type,
  }
  if (content) {
    options.content = content
  }
  if (creatorId) {
    options.creatorId = creatorId
  }
  if (blogId) {
    options.blogId = blogId
  }
  const result = await Notification.create(options)
  return result.dataValues
}

const getNotification = async ({userId}) => {
  const result = await Notification.findAll({
    where: {
      userId,
      isRead: false,
    },
    attributes: ['id', 'createdAt', 'content', 'isRead', 'type', 'userId'],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      },
      {
        model: Blog,
        attributes: ['id', 'title']
      }
    ]
  })

  return result
}

const updateNotification = async (where, newData) => {
  const result = await Notification.update(newData, {where})
  return result[0] > 0
}


module.exports = {
  createNotification,
  getNotification,
  updateNotification,
}