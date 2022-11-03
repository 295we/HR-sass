import Axios from 'axios'
const service = Axios.create()
service.interceptors.request.use()
service.interceptors.response.use()
export default service
