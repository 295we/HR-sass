import request from '@/utils/request'

/**
 * 封装读取角色信息的请求
 */
export const getRoleList = params => request.get('/sys/role', params) // params是查询参数，里面需要携带分页信息

/**
 * 获取公司信息
 */
export const getCompanyInfo = companyId => request.get(`/company/${companyId}`)

/**
 * 删除role(角色)
 */
export const deleteRole = id => request.delete(`/sys/role/${id}`)

/**
 * 编辑角色
 */
export const updateRole = data => request.put(`/sys/role/${data.id}`, data)

/**
 * 获取角色详情
 */
export const getRoleDetail = id => request.get(`/sys/role/${id}`)

/**
 * 新增角色
 */
export const addRole = data => request.post('/sys/role', data)
