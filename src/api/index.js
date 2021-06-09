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