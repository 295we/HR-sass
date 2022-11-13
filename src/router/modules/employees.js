// 导出员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/employees',
  name: 'employees', // 给模块的一级路由加name属性 这个属性我们后面会在做权限的时候用到
  component: Layout,
  children: [
    {
      // 二级路由什么都不用写的时候 此时它表示二级路由的默认路由
      path: '', // 这里什么都不写 表示在地址栏跳到/employees下的时候布局里不但有Layout 还有二级路由employees
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理', // 这里为什么要用title呢 因为左侧导航读取了title属性
        icon: 'peoples'
      }
    }
  ]
}
