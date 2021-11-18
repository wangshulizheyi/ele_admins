import { login } from '../../api/user.js'
import md5 from 'md5'
import * as utils from '@/utils/storage.js'
import { TOKEN } from '@/common/common.js'

const state = {
  token: ''
}
const getters = {}
const mutations = {
  setToken(state, token) {
    // 保存vueex
    state.token = token
    // 保存到本地存储中
    utils.setItem(TOKEN, token)
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
        commit('setToken', res.token)
        resolve()
      })
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
