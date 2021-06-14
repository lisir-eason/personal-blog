const { seq } = require('../sequelize')
const { Integer, String } = require('../type')

const Collection = seq.define('Collection', {
  userId: {
    type: Integer,
    allowNull: false,
    comment: '用户id',
  },
  collectionName: {
    type: String,
    allowNull: false,
    comment: '收藏夹的名字',
  },
})

module.exports = Collection