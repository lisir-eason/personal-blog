const LikeRelation = require('../db/model/like-relation')
const User = require('../db/model/user')


const getLiker = async ({blogId}) => {
  const result = await LikeRelation.findAndCountAll({
    where: {
      blogId,
    },
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  if (!result) {
    return result
  }

  const users = result.rows.map(item => {
    return item.dataValues.User.dataValues
  })

  return {
    count: result.count,
    users
  }
}

const createLiker = async ({userId, blogId}) => {
  const result = await LikeRelation.create({userId, blogId})
  return result.dataValues
}

const deleteLiker = async ({userId, blogId}) => {
  const result = await LikeRelation.destroy({
    where: {userId, blogId}
  })
  return result > 0
}

module.exports = {
  getLiker,
  createLiker,
  deleteLiker,
}