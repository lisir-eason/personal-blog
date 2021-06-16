import api from './api'

export const register = (params) => {
  return api.post('/users/register', params)
}

export const isUserExit = (params) => {
  return api.post('/users/isExist', params)
}

export const login = (params) => {
  return api.post('/users/login', params)
}

export const getCurrentUser = () => {
  return api.post('/users/currentUser')
}

export const logout = () => {
  return api.post('/users/logout')
}

export const updateUserInfo = (params) => {
  return api.post('/users/updateUserInfo', params)
}

export const changePassword = (params) => {
  return api.post('/users/changePassword', params)
}

export const createNewBlog = (params) => {
  return api.post('/blogs/createBlog', params)
}

export const deleteUserBlog = (params) => {
  return api.post('/blogs/deleteUserBlog', params)
}

export const getBlogInfoById = (id) => {
  return api.get(`/blogs/getBlog/${id}`)
}

export const getUserBlogs = (params) => {
  return api.get('/blogs/getUserBlog', {params})
}

export const getHomeBlogs = (params) => {
  return api.get('/blogs/getHomePageBlog', {params})
}

export const updateBlogById = (params) => {
  return api.post('/blogs/updateBlog', params)
}

export const followUser = (params) => {
  return api.post(`/userRelation/follow?userId=${params.userId}`)
}

export const getBlogLikers = (params) => {
  return api.get('/blogs/getLiker', {params})
}

export const unFollowUser = (params) => {
  return api.post(`/userRelation/unFollow?userId=${params.userId}`)
}

export const isFollowUser = (params) => {
  return api.get('/userRelation/isFollow', {params})
}

export const getUserFollower = (params) => {
  return api.get('/userRelation/getFollower', {params})
}

export const getCurrentUserFocus = () => {
  return api.get('/userRelation/getCurrentUserFocus')
}

export const increaseViewCount = (params) => {
  return api.post('/blogs/increaseViewCount', params)
}

export const userLikeBlog = (params) => {
  return api.post('/blogs/userLikeBlog', params)
}

export const unLikeBlog = (params) => {
  return api.post('/blogs/unLikeBlog', params)
}

export const getUserCollections = (params) => {
  return api.get('/collection/getUserCollections', {params})
}

export const createCollection = (params) => {
  return api.post('/collection/createCollection', params)
}

export const createCollectBlog = (params) => {
  return api.post('/collection/createCollectBlog', params)
}

export const getCurrentUserCollectBlogs = () => {
  return api.get('/collection/getCurrentUserCollectBlogs')
}

export const updateCollection = (params) => {
  return api.post('/collection/updateCollection', params)
}

export const deleteCollection = (params) => {
  return api.post('/collection/deleteCollection', params)
}

export const deleteCollectBlog = (params) => {
  return api.post('/collection/deleteCollectBlog', params)
}

export const deleteCollectBlogByBlogId = (params) => {
  return api.post('/collection/deleteCollectBlogByBlogId', params)
}

export const getBlogCollects = (params) => {
  return api.get('/collection/getBlogCollect', {params})
}

export const createComment = (params) => {
  return api.post('/comment/createComment', params)
}

export const getBlogCommentById = (params) => {
  return api.get('/comment/getBlogComment', {params})
}

export const getCurrentUserNotification = () => {
  return api.get('/notification/getCurrentUserNotification',)
}

export const readNotification = (params) => {
  return api.post('/notification/readNotification', params)
}

export const readNotificationByBlogId = (params) => {
  return api.post('/notification/readNotificationByBlogId', params)
}
