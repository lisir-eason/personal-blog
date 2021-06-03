import api from './api'

export const register = (params) => {
  return api.post('/users/register', params)
}

export const isUserExit = (params) => {
  return api.post('/users/isExist', params)
}