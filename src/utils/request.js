import { ElMessage } from 'element-plus'
import axios from 'axios'
// import { getItem } from '@/utils/storage.js'
// import { TOKEN } from '@/common/common.js'
import store from '@/store/index.js'
import { isCheckTimeOut } from './auth.js'
// 分装token
const server = axios.create({
  timeout: 5000,
  baseURL: '/api'
})

// 不需要登录(不需要token) 就能访问的接口 白名单
// const whiteUrl = ['/sys/login']
// 请求拦截
server.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      if (!isCheckTimeOut()) {
        store.dispatch('user/loout')
        return Promise.reject(new Error('token 过期'))
      }
      // 如果存在token 不存在 不封装
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 错误处理 服务器返回错误 消息提醒
server.interceptors.response.use(
  (response) => {
    const { success, data, message } = response.data
    if (success) {
      return data
    } else {
      ElMessage({
        type: 'error',
        message: message
      })
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    ElMessage({
      type: 'error',
      message: '服务器请求失败'
    })
    return Promise.reject(error)
  }
)
// 导出一个对象 分装好的token
export default server
