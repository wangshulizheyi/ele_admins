// 用户鉴权
import router from './router'
import store from './store/index.js'

const whiteRouter = ['/login']
router.beforeEach(async (to, from, next) => {
  /*
    用户鉴权
      当用户未登录是(没有token) ,只能进入login页面
      用户登录后,token 未过期之前,不允许进入login页面
   */
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        // setTimeout(async () => {
        //   await store.dispatch('user/getUserInfo')
        //   next()
        // }, 70000)
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (whiteRouter.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
