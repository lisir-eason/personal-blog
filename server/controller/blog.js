const {create, update, getBlogInfo, getUserBlogInfo, deleteBlog,} = require('../services/blog')
const {getLiker} = require('../services/like-relation')
const {getHomePageBlogs} = require('../cache/blog')
const {getUserInfo} = require('../services/user')
const {
  createBlogFailed,
  getBlogInfoFailed,
  getUserBlogFailed,
  noAccessToUpdateBlog,
  updateBlogFailed,
  getHomeBlogFailed,
  getLikerFailed,
  deleteBlogFailed,
} = require('../model/errNum')
const { SuccessModal, ErrorModal } = require('../model/resModal')


const createBlog = async ({userId, title, tags, htmlContent, rawContent}) => {
  try {
    const result = await create({userId, title, tags, htmlContent, rawContent})
    return new SuccessModal({data: result})
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModal(createBlogFailed)
  }
}

const updateBlog = async ({id, userId, title, tags, htmlContent, rawContent}) => {
  const blog = await getBlogInfo({id})
  if (blog.user.id !== userId) {
    return new ErrorModal(noAccessToUpdateBlog)
  }

  const result = await update({id, title, tags, htmlContent, rawContent})
  if (result) {
    return new SuccessModal({data: '修改成功'})
  }
  return new ErrorModal(updateBlogFailed)
}

const increaseViewCount = async ({id}) => {
  const blog = await getBlogInfo({id})
  const viewCount = blog.blog.viewCount + 1
  const result = await update({id, viewCount})
  if (result) {
    return new SuccessModal({data: '增加浏览量成功'})
  }
  return new ErrorModal(updateBlogFailed)
}

const getBlog = async ({id}) => {
  const blog = await getBlogInfo({id})
  if (blog) {
    return new SuccessModal({data: blog})
  }
  return new ErrorModal(getBlogInfoFailed)
}

const getBlogByUser = async ({userName}) => {
  const userInfo = await getUserInfo({userName})
  const blogs = await getUserBlogInfo({userId: userInfo.id})
  if (blogs) {
    return new SuccessModal({data: {blogs, user: userInfo}})
  }
  return new ErrorModal(getUserBlogFailed)
}

const getHomePageBlogList = async ({page, perPage}) => {
  const blogs = await getHomePageBlogs({page, perPage})
  if (blogs) {
    return new SuccessModal({data: blogs})
  }
  return new ErrorModal(getHomeBlogFailed)
}

const getBlogLiker = async ({blogId}) => {
  const blogs = await getLiker({blogId})
  if (blogs) {
    return new SuccessModal({data: blogs})
  }
  return new ErrorModal(getLikerFailed)
}

const deleteUserBlog = async({userId, blogId}) => {
  const result = await deleteBlog({userId, blogId})
  if (result) {
    return new SuccessModal({data: '删除成功！'})
  }
  return new ErrorModal(deleteBlogFailed)
}

module.exports = {
  createBlog,
  getBlog,
  getBlogByUser,
  getHomePageBlogList,
  updateBlog,
  increaseViewCount,
  getBlogLiker,
  deleteUserBlog,
}