import request from '@/utils/request'

export function login(data) {
  return request.post('/sys/login', data)
}

export function logout() {}

// 获取用户资料的接口
export const getUserInfo = () => request.post('/sys/profile')
