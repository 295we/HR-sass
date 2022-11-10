import Layout from '@/layout'

export default {
  path: '/salaries',
  name: 'salaries',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/salaries'),
      meta: {
        title: '工资'
      }
    }
  ]
}
