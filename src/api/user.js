import request from '@/utils/request'

export function login(data) {
  return request.post('/sys/login', data)
}

export function getInfo(token) {}

export function logout() {}
