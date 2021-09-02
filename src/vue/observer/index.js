import { isObject } from '../utils'
import { arrayMethods } from "./observer/array"
export function observe (data) {
  // 如果该属性已被劫持,则跳过
  if (data.__ob__) return
  // 如果是对象,才进行观测
  if (!isObject(data)) return
  return new Observer(data)
}
/**
 * 1.如果是对象,将会对对象进行不停的递归劫持
 * 2.如果是数组,会劫持数组的方法,并对数组遍历,其中非基本类型数据进行劫持
 */
// 使用Observer类,是因为类有类型,只需看属性有没有类,就知道该属性是否被劫持
class Observer {
  // 对象中所有属性进行劫持
  constructor(data) {
    /**
     * data与this建立联系
     * 1.如果数组新增了对象,需要在数组的data中用到this.observeArray
     * 2.可以判断该data是否已被劫持
     */
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false,// 该属性不能被枚举,否则会不停的给data加属性,死循环
    })
    if (Array.isArray(data)) {
      // 处理数组,重写数组7个变异方法
      // 只让劫持的data数据,使用重写的7个方法
      data.__proto__ = arrayMethods
      // 如果数组中的数据是对象类型,则劫持该对象
      this.observeArray(data)
    } else {
      // 非数组才进行劫持操作
      this.work(data)
    }
  }
  observeArray (data) {
    data.forEach(item => {
      // 递归劫持数组中的每一项
      observe(item)
    })
  }
  work (data) {
    object.key(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}
// vue2会对对象进行遍历,每一项都用defineProperty重新定义,所以性能差
function defineReactive (data, key, value) {
  // 递归劫持,如果是对象就继续劫持
  observe(value)
  Object.defineProperty(data, key, {
    get () {
      return value
    },
    set (newValue) {
      // 如果用户赋值新对象,则将对象继续劫持
      observe(newValue)
      value = newValue
    }
  })
}