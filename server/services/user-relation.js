const UserRelation = require('../db/model/user-relation')
const User = require('../db/model/user')


const create = async ({id, userId}) => {
  const result = await UserRelation.create({
    userId,
    followerId: id
  })

  return result.dataValues
}

const deleteRelation = async ({id, userId}) => {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId: id
    }
  })

  return result > 0
}

const getRelation = async ({id, userId}) => {
  const result = await UserRelation.findOne({
    where: {
      userId,
      followerId: id
    }
  })

  if (!result) {
    return result
  }

  return result.dataValues
}

const getFollowers = async ({id}) => {
  const result = await UserRelation.findAll({
    where: {
      userId: id,
    },
    attributes: ['followerId'],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture'],
      }
    ]
  })

  if (!result.length) {
    return result
  }

  return result.map(item => {
    return item.dataValues.User.dataValues
  })
}

module.exports = {
  create,
  deleteRelation,
  getRelation,
  getFollowers,
}