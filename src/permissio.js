// 用户鉴权

import router from './router'
import store from './store/index.js'

router.beforeEach((to, from, next) => {
  /*
    用户鉴权
      当用户未登录是(没有token) ,只能进入login页面
      用户登录后,token 未过期之前,不允许进入login页面
   */
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
