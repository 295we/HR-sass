const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: () => {},
  name: state => state.user.userInfo.username // 建立对用户名的快捷访问
}
export default getters
