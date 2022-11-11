import Vue from 'vue'
import Router from 'vue-router'
import approvals from '@/views/approvals'
import attendances from '@/views/attendances'
import departments from '@/views/departments'
import employees from '@/views/employees'
import permission from '@/views/permission'
import salaries from '@/views/salaries'
import setting from '@/views/setting'
import social from '@/views/social'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  // 当我们路由匹配不到的时候会匹配'*' 从而重定向到404
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [approvals, attendances, departments, employees, permission, salaries, setting, social]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }), // 管理滚动行为 如果出现滚动 切换就让 让页面回到顶部
    routes: [...constantRoutes, ...asyncRoutes] // 临时合并所有的路由
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
