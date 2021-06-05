/**
 * @description 创建sequelize实例
 */

const { Sequelize } = require('sequelize')
const { DB_CONF } = require('../conf/db')


const { database, user, password, host, dialect, port } = DB_CONF
const sequelize = new Sequelize( database, user, password, {
  host,
  dialect,
  port,
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  }
})

module.exports = {
  seq: sequelize,
}