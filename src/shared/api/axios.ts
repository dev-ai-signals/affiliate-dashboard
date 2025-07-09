import axios from 'axios'
import { useUserStore } from '@/shared/stores/user'

const api = axios.create({
  baseURL: '/api',
  timeout: 3000
})

api.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    const token = userStore.token

    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

export default api