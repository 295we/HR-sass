import request from '@/utils/request'

/**
 * 获取员工的简单列表
 */
export const getEmployeeSimple = () => request.get('/sys/user/simple')
