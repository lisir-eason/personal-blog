const {create, getBlogInfo, getUserBlogInfo} = require('../services/blog')
const {getUserInfo} = require('../services/user')
const {
  createBlogFailed,
  getBlogInfoFailed,
  getUserBlogFailed,
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

const getBlog = async ({id}) => {
  const blog = await getBlogInfo({id})
  if (blog) {
    return new SuccessModal({data: blog})
  }
  return new ErrorModal(getBlogInfoFailed)
}

const getBlogByUser = async ({userName}) => {
  const {id: userId} = await getUserInfo({userName})
  const blogs = await getUserBlogInfo({userId})
  if (blogs) {
    return new SuccessModal({data: blogs})
  }
  return new ErrorModal(getUserBlogFailed)
}

module.exports = {
  createBlog,
  getBlog,
  getBlogByUser,
}