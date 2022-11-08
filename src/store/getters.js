const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username, // 建立对用户名的快捷访问
  userId: state => state.user.userInfo.userId, // 建立用户id的映射
  userImg: state => state.user.userInfo.staffPhoto // 建立用户头像的映射
}
export default getters
