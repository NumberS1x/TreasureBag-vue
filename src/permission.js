import router from './router'
import {getToken, removeToken} from '@/utils/auth'
import axios from "axios";

const whiteList = ['/login','/'];

router.beforeEach((to, from, next) => {
  const hasToken = sessionStorage.getItem('Admin-Token')
  if (hasToken) {
    //验证token是否过期

    if (to.path === '/login') {
      // 如果已经登录并尝试访问登录页面，则重定向到主页
      sessionStorage.removeItem('Admin-Token')
      next('/');
    } else {
      // 继续前往目标路由
      next();
    }
  } else {
    // 如果未登录
    if (whiteList.includes(to.path)) {
      // 允许访问登录页面
      next();
    } else {
      // 对于其他需要身份验证的页面，重定向到登录页面，并携带原始目标路径作为查询参数
      next({ path: '/login' });
    }
  }
});

