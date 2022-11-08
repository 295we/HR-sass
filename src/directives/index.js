// 负责管理所有的自定义指令

// 指令对象
export const imgError = {
  // inserted会在当前的dom元素插入到节点之后才去执行
  inserted(dom, options) {
    // options是指令中的变量的解释 其中有一个属性叫value 就是引号所传的变量对应的值
    // dom:表示当前指令作用的dom对象
    // 当图片有地址但是地址没有加载成功的时候会报错 会触发图片的一个事件 => onerror
    dom.onerror = function() {
      // 当图片出现异常的时候会将指令配置的默认图片设置为该图片的内容
      dom.src = options.value // 这里不能写死 需要是v-imgError='' 等号后面的值
    }
  }
}
