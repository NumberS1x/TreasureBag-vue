import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
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
        },
        {
          path: '/logs',
          name: "LogsInfo",
          component: () => import("@/views/log/LogViewer")
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
    },
    {
      path: '/easychat',
      name: "EasyChat",
      component: () => import("@/views/Chat")
    }
  ]
})

export default router
