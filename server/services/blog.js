const { Blog } = require('../db/model/index')


const create = async ({userId, title, tags, htmlContent, rawContent}) => {
  const result = await Blog.create({userId, title, tags, htmlContent, rawContent})
  return result.dataValues
}

module.exports = {
  create,
}