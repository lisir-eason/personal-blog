/**
 * @description user的service层
 */

const { User } = require('../db/model/index')

async function getUserInfo({userName, password}) {
  let where = { userName }
  if (password) {
    where.password = password
  }

  const user = await User.findOne({
    where,
    attributes: ['userName', 'nickName', 'gender', 'picture', 'city']
  })

  if (!user) {
    return user
  }

  return user.dataValues
}

async function createUser({userName, password}) {
  const user = await User.create({ userName, password, nickName:userName })
  return user.dataValues
}


module.exports = {
  getUserInfo,
  createUser,
}