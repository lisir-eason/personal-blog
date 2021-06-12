const { seq } = require('../sequelize')
const { Integer } = require('../type')

const LikeRelation = seq.define('LikeRelation', {
  blogId: {
    type: Integer,
    allowNull: false,
    comment: '点赞的博客id',
    // references: 'blogs',
    // referencesKey: 'id',
  },
  userId: {
    type: Integer,
    allowNull: false,
    comment: '点赞人的id',
  },
})

module.exports = LikeRelation