import axios from 'axios'

let baseUrl

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3001'
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
    if (response.status === 200) {
      return Promise.resolve(response)
    }
    return Promise.reject(response)
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

export default api