/**
 * @description 创建sequelize实例
 */

const { Sequelize } = require('sequelize')
const { DB_CONF } = require('../conf/db')


const { database, user, password, host, dialect, port } = DB_CONF
const sequelize = new Sequelize( database, user, password, {
  host,
  dialect,
  port
})

module.exports = {
  seq: sequelize,
}