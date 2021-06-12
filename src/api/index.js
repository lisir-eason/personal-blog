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

export const unFollowUser = (params) => {
  return api.post(`/userRelation/unFollow?userId=${params.userId}`)
}

export const isFollowUser = (params) => {
  return api.get('/userRelation/isFollow', {params})
}

export const getUserFollower = (params) => {
  return api.get('/userRelation/getFollower', {params})
}

export const increaseViewCount = (params) => {
  return api.post('/blogs/increaseViewCount', params)
}
