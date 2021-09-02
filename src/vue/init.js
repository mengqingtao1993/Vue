import { initState } from './state'
import { compileToFunction } from './compile/index'
import { mountComponent } from './lifecycle'
/**
 * Vue原型扩展方法
 */
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    // 将用户选项都放入了实例上,并传入处理函数
    const vm = this
    vm.$options = options
    // 进行数据劫持
    initState(vm)
    // 挂载数据到模板上
    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
  Vue.prototype.$mount = function (el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    /**
     * 1.将模板转化成对应的渲染函数
     * 2.生成对应的虚拟dom
     * 3.diff算法更新虚拟dom
     * 4.产生真实节点,更新
     */
    // render的优先级高于template
    if (!options.render) {
      let template = options.template
      if (!template && el) {
        // 如果模板也没有,但是又el,那就使用el作为内容模板
        template = el.outerHTML
        let render = compileToFunction(template)
        options.render = render
      }
    }
    mountComponent(vm.el)// 挂载流程
  }
}

