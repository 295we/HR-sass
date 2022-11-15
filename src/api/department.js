import request from '@/utils/request'

// 获取组织架构的真实数据的接口
export const getDepartments = () => request.get('/company/department')
