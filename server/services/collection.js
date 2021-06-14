const { Blog, CollectBlog, Collection, User, } = require('../db/model/index')


const createCollection = async ({userId, collectionName}) => {
  const result = await Collection.create({userId, collectionName})
  return result.dataValues
}

const createCollectBlog = async ({blogId, collectionId, userId}) => {
  const result = await CollectBlog.create({blogId, collectionId, userId})
  return result.dataValues
}

const getCollections = async (userId) => {
  const result = await Collection.findAll({
    where: {
      userId
    },
    order: [
      ['createdAt',]
    ]
  })

  return result
}

const getCollectBlogs = async ({userId}) => {
  const result = await CollectBlog.findAll({
    where: {
      userId
    },
    attributes: ['id', 'blogId', 'collectionId', 'createdAt',],
    order: [
      ['createdAt', 'DESC']
    ],
    include: [
      {
        model: Collection,
        attributes: ['collectionName']
      },
      {
        model: Blog,
        attributes: ['title']
      }
    ]
  })

  if (!result.length) {
    return result
  }

  return result.map(item => {
    const {id, blogId, collectionId, createdAt} = item.dataValues
    const {collectionName} = item.dataValues.Collection.dataValues
    const {title: BlogTitle} = item.dataValues.Blog.dataValues
    return {
      id,
      blogId,
      BlogTitle,
      collectionId,
      collectionName,
      createdAt,
    }
  })
}

const updateCollection = async ({collectId, collectionName}) => {
  const result = await Collection.update({
    collectionName
  },
  {
    where: {
      id: collectId
    }
  })

  return result > 0
}

const deleteCollection = async ({collectId}) => {
  await CollectBlog.destroy({
    where: {
      collectionId: collectId
    }
  })
  const result = await Collection.destroy({
    where: {
      id: collectId
    },
  })

  return result > 0
}

const deleteCollectBlog = async (whereOption) => {
  const result = await CollectBlog.destroy({
    where: whereOption
  })

  return result > 0
}

const getCollectBlog = async ({blogId}) => {
  const result = await CollectBlog.findAll({
    where: {
      blogId
    },
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName']
      }
    ]
  })

  if (!result.length) {
    return result
  }

  return result.map(item => {
    const {collectionId, userId} = item.dataValues
    const {userName, nickName} = item.dataValues.User.dataValues
    return {
      collectionId,
      userId,
      userName,
      nickName,
      blogId,
    }
  })
}


module.exports = {
  createCollection,
  createCollectBlog,
  getCollections,
  getCollectBlogs,
  updateCollection,
  deleteCollection,
  deleteCollectBlog,
  getCollectBlog,
}