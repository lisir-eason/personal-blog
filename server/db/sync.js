/**
 * @description 同步数据模型到数据库
 */

const { seq } = require('./sequelize')
require('./model/index')

//验证数据库连接
seq.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch((err) => {
  console.error('Unable to connect to the database:', err)
})

//同步数据
seq.sync({ force: true }).then(() => {
  console.log('Sync data to database successfully.')
  process.exit()
}).catch(err => {
  console.error('Unable to sync data to the database:', err)
})
