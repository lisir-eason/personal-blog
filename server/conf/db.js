/**
 * @description db的配置文件
 */

let DB_CONF = {
  database: 'personal_blog',
  user: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
}

let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
}

module.exports = {
  DB_CONF,
  REDIS_CONF,
}