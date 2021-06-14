const {
  createCollectionFailed,
  createCollectBlogFailed,
  updateCollectionFailed,
  deleteCollectionFailed,
  deleteCollectBlogFailed,
} = require('../model/errNum')
const { SuccessModal, ErrorModal } = require('../model/resModal')
const {getCollections, createCollection, createCollectBlog,
  getCollectBlogs, updateCollection, deleteCollection, deleteCollectBlog,
  getCollectBlog,
} = require('../services/collection')


const getUserCollections = async (userId) => {
  const collections = await getCollections(userId)
  return new SuccessModal({data: collections})
}

const createUserCollection = async (ctx, collectionName) => {
  const {id:userId} = ctx.session.userInfo
  try {
    const result = await createCollection({userId, collectionName})
    return new SuccessModal({data: result})
  } catch (error) {
    console.error(error)
    return new ErrorModal(createCollectionFailed)
  }
}

const createUserCollectBlog = async({blogId, collectionId, userId}) => {
  try {
    const result = await createCollectBlog({blogId, collectionId, userId})
    return new SuccessModal({data: result})
  } catch (error) {
    console.error(error)
    return new ErrorModal(createCollectBlogFailed)
  }
}

const getCurrentUserCollectBlogs = async(ctx) => {
  const {id:userId} = ctx.session.userInfo
  const result = await getCollectBlogs({userId})
  return new SuccessModal({data: result})
}

const updateUserCollection = async ({collectId, collectionName}) => {
  const result = await updateCollection({collectId, collectionName})
  if (result) {
    return new SuccessModal({data: '更新成功'})
  }
  return new ErrorModal(updateCollectionFailed)
}

const deleteUserCollection = async ({collectId}) => {
  try {
    const result = await deleteCollection({collectId})
    if (result) {
      return new SuccessModal({data: '删除成功'})
    }
    return new ErrorModal(deleteCollectionFailed)
  } catch (error) {
    console.error(error)
    return new ErrorModal(deleteCollectionFailed)
  }
}

const deleteUserCollectBlog = async ({collectId}) => {
  try {
    const result = await deleteCollectBlog({id: collectId})
    if (result) {
      return new SuccessModal({data: '删除成功'})
    }
    return new ErrorModal(deleteCollectBlogFailed)
  } catch (error) {
    console.error(error)
    return new ErrorModal(deleteCollectBlogFailed)
  }
}

const deleteCollectBlogByBlogId = async ({blogId, userId}) => {
  try {
    const result = await deleteCollectBlog({blogId, userId})
    if (result) {
      return new SuccessModal({data: '删除成功'})
    }
    return new ErrorModal(deleteCollectBlogFailed)
  } catch (error) {
    console.error(error)
    return new ErrorModal(deleteCollectBlogFailed)
  }
}

const getBlogCollect = async ({blogId}) => {
  const collectBlogs = await getCollectBlog({blogId})
  return new SuccessModal({data: collectBlogs})
}

module.exports = {
  getUserCollections,
  createUserCollection,
  createUserCollectBlog,
  getCurrentUserCollectBlogs,
  updateUserCollection,
  deleteUserCollection,
  deleteUserCollectBlog,
  getBlogCollect,
  deleteCollectBlogByBlogId,
}