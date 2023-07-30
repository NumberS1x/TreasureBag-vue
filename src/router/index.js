import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/Login"),
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import("@/layout/Layout"),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import("@/views/Home")
        }
      ]
    },
    {
      path: '/goods/list',
      name: 'GoodsList',
      component: () => import("@/views/seckill/GoodsList")
    }
  ]
})

export default router
