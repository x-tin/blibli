import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '../views/register'
import login from '../views/login'
import Userinfo from '../views/userinfo'
import edit from '../views/edit'
import home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: home
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/userinfo',
    component: Userinfo,
    // 判断是否是需要判断token的页面
    meta: {
      isToken: true
    }
  },
  {
    path: '/edit',
    component: edit,
    meta: {
      isToken: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 不设置以下操作的话，userinfo界面是可以任意访问的，
// 所以在每次路由跳转之前先判断是否存储的有token和id如果有的话就执行下一步跳转页面，没有就返回登录页面
// 但是有一个问题这个方法是每一次路由跳转都会触发，包括首页，首页没有存储用户信息，所以要判断在那个页面
router.beforeEach((to, from, next) => {
  if (to.meta.isToken === true && !localStorage.getItem('token') && !localStorage.getItem('id')) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
  }
  next()
})

export default router
