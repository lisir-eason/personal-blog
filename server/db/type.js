/**
 * @description 数据库数据类型
 */

const { DataTypes } = require('sequelize')

module.exports = {
  String: DataTypes.STRING, // VARCHAR(255)
  Text: DataTypes.TEXT, // TEXT
  Integer: DataTypes.INTEGER, // INTEGER
  Float: DataTypes.FLOAT // FLOAT
}