import axios from 'axios'
import { getUserToken } from '@/shared/stores/user'

const api = axios.create({
  baseURL: '/api',
  timeout: 3000
})

api.interceptors.request.use(
  config => {
    const token = getUserToken()
    console.log('Sending request with token:', token)
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default api
