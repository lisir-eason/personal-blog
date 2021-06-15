/**
 * @description 模型入口文件
 */

const User = require('./user')
const Blog = require('./blog')
const UserRelation = require('./user-relation')
const LikeRelation = require('./like-relation')
const CollectBlog = require('./collect-blog')
const Collection = require('./collection')

Blog.belongsTo(User, {
  foreignKey: 'userId',
})

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
})


User.hasMany(UserRelation, {
  foreignKey: 'userId'
})

User.hasMany(UserRelation, {
  foreignKey: 'followerId'
})

LikeRelation.belongsTo(User, {
  foreignKey: 'userId',
})

Blog.hasMany(LikeRelation, {
  foreignKey: 'blogId',
})

Blog.hasMany(CollectBlog, {
  foreignKey: 'blogId',
})

CollectBlog.belongsTo(Collection, {
  foreignKey: 'collectionId'
})

CollectBlog.belongsTo(Blog, {
  foreignKey: 'blogId'
})

CollectBlog.belongsTo(User, {
  foreignKey: 'userId'
})

Collection.belongsTo(User, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  LikeRelation,
  CollectBlog,
  Collection,
}