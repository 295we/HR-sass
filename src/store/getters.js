const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: state => state.user.token,
  avatar: () => {},
  name: () => {}
}
export default getters
