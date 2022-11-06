import Axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

const service = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 这个值有两种情况，取决于是开发环境还是生产环境
  timeout: 5000
})
// 请求拦截器 因为每次调用接口都会注入token 所以我们在请求拦截器注入token
service.interceptors.request.use(
  (config) => {
    // config是请求的配置信息 通过请求头注入token
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 必须要返回出去!!!
  },
  (error) => Promise.reject(error)
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // axios默认加了一层data
    const { success, message, data } = response.data
    // 要根据success成功与否 来执行下面的操作
    if (success) {
      return data
    } else {
      // 业务已经错误了 弹出错误消息 并且进入catch
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    Message.error(error.message) // 提示错误
    return Promise.reject(error) // 返回执行错误，让当前的执行链跳出成功 直接进入catch
  }
)
export default service
