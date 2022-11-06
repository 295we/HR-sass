// 权限拦截在路由跳转做 导航守卫
import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css'

// 不需要导出，因为在main.js中引入了 代码会执行

// 前置守卫
// next是前置守卫必须执行的钩子
// next() 放行
// next(false) 跳转终止
// next(地址) 跳转到某个地址
const whiteList = ['/login', '/404']

router.beforeEach((to, from, next) => {
  nprogress.start() // 开启进度条
  if (store.getters.token) {
    // 如果有token 继续判断是不是去登录页
    if (to.path === '/login') {
      // 如果要访问登录页
      next('/')
    } else {
      // 如果有token且不去登录页 直接放行
      next()
    }
  } else {
    // 没有token
    if (whiteList.some((item) => item === to.path)) {
      // 表示要去的地址在白名单内
      next()
    } else {
      next('/login') // 跳到登录页
    }
  }
  nprogress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  nprogress.done()
})
