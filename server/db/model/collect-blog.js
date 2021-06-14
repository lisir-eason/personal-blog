const { seq } = require('../sequelize')
const { Integer } = require('../type')

const CollectBlog = seq.define('CollectBlog', {
  userId: {
    type: Integer,
    allowNull: false,
    comment: '用户id',
  },
  blogId: {
    type: Integer,
    allowNull: false,
    comment: '博客id',
  },
  collectionId: {
    type: Integer,
    allowNull: false,
    comment: '收藏夹的id',
  },
})

module.exports = CollectBlog