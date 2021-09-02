/**
 * 生命周期相关函数
 */
// 提供_update函数
export function lifecycleMixin (Vue) {
  Vue.prototype._update = function(vnode){

  }
}
// 挂载函数
export function mountComponent (vm, el) {
  // 更新函数,数据变化后会再次调用
  let updateComponent = () => {
    // 核心调用,每次挂载时,先调用render生成虚拟dom,在调用update生成真实dom
    vm._update(vm._render())
  }
  updateComponent()
}