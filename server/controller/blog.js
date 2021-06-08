const {create} = require('../services/blog')
const {
  createBlogFailed
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

module.exports = {
  createBlog,
}