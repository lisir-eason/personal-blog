/**
 * @description 模型入口文件
 */

const User = require('./user')
const Blog = require('./blog')

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}