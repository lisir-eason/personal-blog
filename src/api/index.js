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

export const isLogin = () => {
  return api.post('/users/isLogin')
}

export const logout = () => {
  return api.post('/users/logout')
}