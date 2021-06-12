const { seq } = require('../sequelize')
const { String, Integer, Text } = require('../type')

const Blog = seq.define('Blog', {
  userId: {
    type: Integer,
    allowNull: false,
    comment: '用户 ID'
  },
  title: {
    type: String,
    allowNull: false,
    comment: '博客标题'
  },
  tags: {
    type: String,
    allowNull: false,
    comment: '博客标签'
  },
  rawContent: {
    type: Text,
    allowNull: false,
    comment: 'raw内容'
  },
  htmlContent: {
    type: Text,
    allowNull: false,
    comment: 'html内容'
  },
  viewCount: {
    type: Integer,
    allowNull: false,
    defaultValue: 0,
    comment: '博客浏览次数'
  },
})

module.exports = Blog
