/**
 * @description 模型入口文件
 */

const User = require('./user')
const Blog = require('./blog')
const UserRelation = require('./user-relation')
const LikeRelation = require('./like-relation')

Blog.belongsTo(User, {
  foreignKey: 'userId',
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'userId'
})

LikeRelation.belongsTo(User, {
  foreignKey: 'userId',
})


Blog.hasMany(LikeRelation, {
  foreignKey: 'blogId',
})
// LikeRelation.belongsTo(Blog, {
//   foreignKey: 'blogId',
// })

module.exports = {
  User,
  Blog,
  UserRelation,
  LikeRelation
}