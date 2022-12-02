import pageTools from './pageTools'

// 注册全局组件pageTools
export default {
  install: function(Vue) {
    Vue.component(pageTools.name, pageTools)
  }
}
