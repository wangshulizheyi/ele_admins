import { login, getUserInfo } from '../../api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN, USER_INFO } from '@/common/common.js'
import router from '@/router/index.js'
import { setTimeStamp } from '@/utils/auth.js'

const state = {
  token: utils.getItem(TOKEN) || '',
  userInfo: utils.getItem(USER_INFO) || {}
}
const getters = {}
const mutations = {
  setToken(state, token) {
    // 保存vueex
    state.token = token
    // 保存到本地存储中
    utils.setItem(TOKEN, token)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
    utils.setItem(USER_INFO, userInfo)
  }
}
const actions = {
  login({ commit }, info) {
    // 获取账号密码的信息
    const { username, password } = info

    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      }).then((res) => {
        // 保存token 到vuex 和本地存储中
        commit('setToken', res.token)
        // 记录token的获取时间
        setTimeStamp()
        resolve()
      })
    })
  },
  logout({ commit }) {
    // 清理用户数据
    commit('setToken', '')

    commit('setUserInfo', {})

    // 跳转
    router.push('/login')
  },
  getUserInfo({ commit }) {
    getUserInfo()
      .then((res) => {
        commit('setUserInfo', res)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
