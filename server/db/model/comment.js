const { seq } = require('../sequelize')
const { Integer, Text, } = require('../type')

const Comment = seq.define('Comment', {
  userId: {
    type: Integer,
    allowNull: false,
    comment: '写评论的人',
  },
  blogId: {
    type: Integer,
    allowNull: false,
    comment: '评论的博客id',
  },
  content: {
    type: Text,
    allowNull: false,
    comment: '评论的内容',
  },
  replyToId: {
    type: Integer,
    allowNull: false,
    defaultValue: 0,
    comment: '回复的评论ID，为0时表示最新评论',
  }
})

module.exports = Comment