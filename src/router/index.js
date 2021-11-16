import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Login'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
