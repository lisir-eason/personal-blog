/**
 * @description 模型入口文件
 */

const User = require('./user')
const Blog = require('./blog')
const UserRelation = require('./user-relation')
const LikeRelation = require('./like-relation')
const CollectBlog = require('./collect-blog')
const Collection = require('./collection')
const Comment = require('./comment')
const Notification = require('./notification')

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

Blog.hasMany(Comment, {
  foreignKey: 'blogId',
})

Comment.belongsTo(User, {
  foreignKey: 'userId'
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

Notification.belongsTo(User, {
  foreignKey: 'creatorId'
})

Notification.belongsTo(Blog, {
  foreignKey: 'blogId'
})

module.exports = {
  User,
  Blog,
  UserRelation,
  LikeRelation,
  CollectBlog,
  Collection,
  Comment,
  Notification,
}