/**
 * render相关函数
 */
// 实例扩展_render方法
import { createElement, createTextElement } from './vdom/index'
export function renderMixin (Vue) {
  // 元素处理函数
  Vue.prototype._c = function (tag, data, ...children) {
    createElement(this, ...arguments)
  }
  // 文本处理函数
  Vue.prototype._v = function (text) {
    createTextElement(this, text)
  }
  // 变量处理函数
  Vue.prototype._s = function (value) {
    return JSON.stringify(value)
  }
  Vue.prototype._render = function () {
    const vm = this
    let render = vm.$options.render
    let vnode = render.call(vm)// 绑定vm
    return vnode
  }
}
