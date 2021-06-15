/**
 * @description user的service层
 */

const { User } = require('../db/model/index')
const {defaultUserImg, genRandomPic} = require('../conf/proConf')

async function getUserInfo({userName, password, id}) {
  let where = { }
  if (userName) {
    where.userName = userName
  }
  if (password) {
    where.password = password
  }
  if (id) {
    where.id = id
  }

  const user = await User.findOne({
    where,
    attributes: ['id', 'userName', 'nickName', 'gender', 'picture', 'city',
      'signature', 'qq', 'weChat', 'github']
  })

  if (!user) {
    return user
  }
  if (!user.dataValues.picture) {
    user.dataValues.picture = defaultUserImg
  }

  return user.dataValues
}

async function createUser({userName, password}) {
  const user = await User.create({ userName, password, nickName: userName, picture: genRandomPic()})
  return user.dataValues
}

async function updateUser(newData, where) {
  const result = await User.update(newData, {where})

  return result[0] > 0
}


module.exports = {
  getUserInfo,
  createUser,
  updateUser,
}