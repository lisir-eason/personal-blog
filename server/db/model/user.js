/**
 * @description user的模型
 */

const { seq } = require('../sequelize')
const { String, Integer } = require('../type')

const User = seq.define('User', {
  userName: {
    type: String,
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  password: {
    type: String,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: String,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: Integer,
    allowNull: false,
    defaultValue: 3,
    comment: '性别 1男 2女 3保密'
  },
  picture: {
    type: String,
    comment: '头像地址'
  },
  city: {
    type: String,
    comment: '城市'
  },
  signature: {
    type: String,
    comment: '签名'
  },
  qq: {
    type: String,
    comment: 'QQ'
  },
  weChat: {
    type: String,
    comment: '微信'
  },
  github: {
    type: String,
    comment: 'github'
  },
})

module.exports = User
