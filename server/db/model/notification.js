const { seq } = require('../sequelize')
const { Integer, BOOLEAN, Text } = require('../type')

const Notification = seq.define('Notification', {
  userId: {
    type: Integer,
    allowNull: false,
    comment: '被通知的人的id',
  },
  type: {
    type: Integer,
    allowNull: false,
    comment: '通知的类型 1.系统通知 2.博客评论 3.回复',
  },
  content: {
    type: Text,
    comment: '通知的内容内容，可以为空'
  },
  creatorId: {
    type: Integer,
    allowNull: true,
    comment: '创建者id，可以为空',
  },
  blogId: {
    type: Integer,
    allowNull: true,
    comment: '关联的博客id，可以为空',
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已读， 默认未读'
  }
})

module.exports = Notification