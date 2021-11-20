import axios from '@/utils/request.js'

// 定义user相关的目录请求
export const login = (data) => {
  // axios 的请求
  return axios.request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户数据
export const getUserInfo = () => {
  return axios.request({
    url: '/sys/profile',
    method: 'get'
  })
}
