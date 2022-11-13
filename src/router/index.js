import Vue from 'vue'
import Router from 'vue-router'
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salariesRouter from './modules/salaries'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

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

// 定义一个动态路由变量
// 这里导出这个变量 后面做权限的时候会用到
export const asyncRoutes = [approvalsRouter, departmentsRouter, employeesRouter, permissionRouter, attendancesRouter, salariesRouter, settingRouter, socialRouter]

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
