import request from '@/utils/request'

// 获取组织架构的真实数据的接口
export const getDepartments = () => request.get('/company/department')

// 封装删除接口 注册下拉菜单事件 根据部门id来操作 接口时根据restful的规则来设计的 删除delete 新增post 修改put 获取get
// restful 同样的地址 不同的方法 执行不同的业务
export const delDepartments = id => request.delete(`/company/department/${id}`)

// 封装新增部门的api模块
export const addDepartments = data => request.post('/company/department', data)

// 封装获取部门详情的api模块
export const getDepartDetail = id => request.get(`/company/department/${id}`)

// 封装编辑部门的api模块
export const updateDepartments = data => request.put(`/company/department/${data.id}`, data)
