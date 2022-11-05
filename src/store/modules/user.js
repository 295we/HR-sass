import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
const state = {
  token: getToken() // 设置token为共享状态 一初始化vuex就先从缓存中读取token
}
const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(state.token) // 同步给缓存 cookie中
  },
  removeToken(state) {
    state.token = null // 将vuex中的token置空
    removeToken()
  }
}
const actions = {
  async login(context, data) {
    // 调用api的接口
    const result = await login(data) // 拿到token
    context.commit('setToken', result) // 设置token
  },
  logout({ commit }, value) {

  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
