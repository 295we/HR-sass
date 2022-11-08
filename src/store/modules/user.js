import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
const state = {
  token: getToken(), // 设置token为共享状态 一初始化vuex就先从缓存中读取token
  userInfo: {} // 定义一个用户信息空对象
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(token) // 同步给缓存 cookie中
  },
  removeToken(state) {
    state.token = null // 将vuex中的token置空
    removeToken()
  },
  setUserInfo(state, result) {
    state.userInfo = result // 这样是响应式的
    // state.userInfo = { ...result } //这样也是响应式的
  },
  // 删除用户信息 用于退出登录
  removeUserInfo(state) {
    state.userInfo = {} // 如果设置为null则会引起getters中的报错
  }
}
const actions = {
  async login(context, data) {
    // 调用api的接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  },
  // 封装调用用户资料的action
  async getUserInfo({ commit }, dada) {
    const result = await getUserInfo() // await会等到自身代码执行完才会执行后续代码
    // 获取用户详情 用户的详情数据
    const baseInfo = await getUserDetailById(result.userId)
    const baseResult = { ...result, ...baseInfo }
    commit('setUserInfo', baseResult)
    return baseResult // 这里返回我们调接口拿到的数据 为后面做权限埋伏笔
  },

  logout({ commit }, value) {}
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
