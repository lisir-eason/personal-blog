const { Blog, User } = require('../db/model/index')
const {defaultUserImg} = require('../conf/proConf')


const create = async ({userId, title, tags, htmlContent, rawContent}) => {
  const result = await Blog.create({userId, title, tags, htmlContent, rawContent})
  return result.dataValues
}

const update = async ({id, title, tags, htmlContent, rawContent}) => {
  const result = await Blog.update({ title, tags, htmlContent, rawContent}, {
    where: {id}
  })
  return result[0] > 0
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
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ]
  })

  if (!result) {
    return result
  }

  const {createdAt, htmlContent, id: blogId, rawContent, tags, title, updatedAt} = result.dataValues
  const {id: userId, nickName, picture, userName} = result.dataValues.User.dataValues

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
      id: userId,
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

const getHomeBlog = async ({page, perPage}) => {
  const result = await Blog.findAndCountAll({
    attributes: ['id', 'rawContent', 'tags', 'title', 'updatedAt'],
    order: [['updatedAt', 'DESC']],
    offset: (page - 1) * perPage,
    limit: perPage,
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ],
  })

  if (!result) {
    return result
  }

  const blogs = result.rows.map(item => {
    const { id: blogId, rawContent, tags, title, updatedAt} = item.dataValues
    const {nickName, picture, userName} = item.dataValues.User.dataValues
    const {blocks} = JSON.parse(rawContent)
    const length = blocks.length
    const description = blocks.reduce((pre, cur, index) => {
      if (index === length - 1) {
        return pre + cur.text + '。'
      }
      return pre + cur.text + '，'
    }, '')
    return {
      updatedAt,
      id: blogId,
      title,
      tags: tags.split(','),
      description,
      userName,
      nickName,
      picture: picture ? picture : defaultUserImg
    }
  })

  return {
    count: result.count,
    list: blogs
  }

}

module.exports = {
  create,
  update,
  getBlogInfo,
  getUserBlogInfo,
  getHomeBlog,
}