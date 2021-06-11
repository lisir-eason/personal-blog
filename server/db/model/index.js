/**
 * @description 模型入口文件
 */

const User = require('./user')
const Blog = require('./blog')
const UserRelation = require('./user-relation')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})

module.exports = {
  User,
  Blog
}