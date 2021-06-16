const { getNotification, updateNotification,} = require('../services/notification')
const {getNotificationFailed, updateNotificationFailed,} = require('../model/errNum')
const {SuccessModal, ErrorModal} = require('../model/resModal')


const getCurrentUserNotification = async (userId) => {
  const result = await getNotification({userId})
  if (result) {
    return new SuccessModal({data: result})
  }
  return new ErrorModal(getNotificationFailed)
}

const readNotification = async (id) => {
  const result = await updateNotification({id}, {isRead: true})
  if (result) {
    return new SuccessModal({data: '更新成功'})
  }
  return new ErrorModal(updateNotificationFailed)
}

const readNotificationByBlogId = async ({userId, blogId}) => {
  const result = await updateNotification({userId, blogId}, {isRead: true})
  if (result) {
    return new SuccessModal({data: '更新成功'})
  }
  return new ErrorModal(updateNotificationFailed)
}

module.exports ={
  getCurrentUserNotification,
  readNotification,
  readNotificationByBlogId,
}