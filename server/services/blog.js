const { Blog, User } = require('../db/model/index')
const {defaultUserImg} = require('../conf/proConf')


const create = async ({userId, title, tags, htmlContent, rawContent}) => {
  const result = await Blog.create({userId, title, tags, htmlContent, rawContent})
  return result.dataValues
}

const getBlogInfo = async ({id}) => {
  const where = {
    id
  }
  const result = await Blog.findOne({
    where,
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  if (!result) {
    return result
  }

  const {createdAt, htmlContent, id: blogId, rawContent, tags, title, updatedAt} = result.dataValues
  const {nickName, picture, userName} = result.dataValues.User.dataValues

  const res = {
    blog: {
      createdAt,
      updatedAt,
      id: blogId,
      title,
      tags: tags.split(','),
      rawContent,
      htmlContent
    },
    user: {
      userName,
      nickName,
      picture: picture ? picture : defaultUserImg
    }
  }

  return res
}

const getUserBlogInfo = async ({userId}) => {
  const result = await Blog.findAll({
    where: {
      userId
    },
    attributes: ['id', 'tags', 'title', 'createdAt', 'updatedAt'],
    order: [['createdAt']]
  })

  if (!result) {
    return result
  }

  const blogs = result.map(item => {
    return item.dataValues
  })

  return blogs
}

module.exports = {
  create,
  getBlogInfo,
  getUserBlogInfo,
}