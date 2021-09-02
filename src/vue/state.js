import { isfunction } from "./utils"
import { observe } from "../vue/observer"
/**
 * 状态初始化
 */
export function initState (vm) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  // if (opts.computed) {
  //   initData()
  // }
  // if (opts.watch) {
  //   initData()
  // }
}
function initData (vm) {
  let data = vm.$options.data
  // vue2会将所有data中的数据进行数据劫持 Object.defineProperty
  // 将data与vm进行关联,这样劫持完data后,可以在vm上看到结果
  data = vm._data = isfunction(data) ? data.call(vm) : data

  // 把vm._data代理到vm上
  for (let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}
function proxy (vm, source, key) {
  // 将vm._data代理到vm上
  Object.defineProperty(vm, source, {
    get () {
      return vm[source][key]
    },
    set (newValue) {
      vm[source][key] = newValue
    }
  })
}
