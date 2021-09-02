import { initMixin } from './init'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './renderMixin'
export default function Vue (options) {
  this._init(options)
}
// 扩展原型,扩展了_init方法
initMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
