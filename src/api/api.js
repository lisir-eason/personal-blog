import axios from 'axios'
import {message} from 'antd'

let baseUrl

if (process.env.NODE_ENV === 'development') {
  // baseUrl = 'http://localhost:3001'
  baseUrl = ''
} else {
  baseUrl = '/apis'
}

const api = axios.create({
  baseURL: baseUrl,
  timeout: 30000
})

api.interceptors.request.use(
  config => {
    //这里是request拦截器
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    if (response.status === 500) {
      message.error('服务器出错，请稍后重试！')
      return
    } else if (response.status === 200) {
      if (response.data.errno === 0 || response.data.errno === 10001) {
        return Promise.resolve(response)
      } else if ( response.data.errno === 10007) {
        if (window.location.pathname === '/') {
          return
        } else if (window.location.pathname.search('profile') !== -1) {
          return
        } else if (window.location.pathname.search('view') !== -1) {
          return
        }
        const pathname = window.location.pathname
        window.location.href= `/register?url=${encodeURIComponent(pathname)}`
        return
      }
      message.error(response.data.message)
      return Promise.reject(response)
    }
    return Promise.reject(response)
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

export default api