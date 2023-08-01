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
    },
    {
      path: '/goods/detail/:id',
      name: "GoodsDetail",
      component: () => import("@/views/seckill/GoodsDetail")
    },
    {
      path: '/order/detail/:orderId',
      name: "OrderDetail",
      component: () => import("@/views/seckill/OrderDetail")
    }
  ]
})

export default router
