const { create, getRelation, getFollowers, deleteRelation,} = require('../services/user-relation')
const {followFailed, noFollowRelation, unFollowFailed} = require('../model/errNum')
const {SuccessModal, ErrorModal} = require('../model/resModal')
const {getUserInfo} = require('../services/user')


const followPeople = async (ctx, userId) => {
  const {id} = ctx.session.userInfo
  try {
    const result = await create({id, userId})
    return new SuccessModal({data: result})
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModal(followFailed)
  }
}

const removeFollow = async (ctx, userId) => {
  const {id} = ctx.session.userInfo
  try {
    const result = await deleteRelation({id, userId})
    if (result) {
      return new SuccessModal({data: {}})
    }
    return new ErrorModal(unFollowFailed)
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModal(unFollowFailed)
  }
}

const isFollow = async (ctx, userId) => {
  const {id} = ctx.session.userInfo
  const result = await getRelation({id, userId})
  if (result) {
    return new SuccessModal({data: result})
  }
  return new ErrorModal(noFollowRelation)
}

const getFollower = async (userName) => {
  const {id} = await getUserInfo({userName})
  const result = await getFollowers({id})
  if (result) {
    return new SuccessModal({data: result})
  }
  return new ErrorModal(getFollowerFailed)
}


module.exports ={
  followPeople,
  removeFollow,
  isFollow,
  getFollower,
}