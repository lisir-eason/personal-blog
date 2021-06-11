const { seq } = require('../sequelize')
const { Integer } = require('../type')

const UserRelation = seq.define('UserRelation', {
  followerId: {
    type: Integer,
    allowNull: false,
    comment: '粉丝ID'
  },
  userId: {
    type: Integer,
    allowNull: false,
    comment: '被关注的人ID'
  },
})

module.exports = UserRelation