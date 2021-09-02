let oldArrayMethods = Array.prototype
// 继承Array的原型方法
export let arrayMethods = Object.create(oldArrayMethods)

let methods = [
  'pop',
  'push',
  'shift',
  'unshift',
  'sort',
  'slice',
  'reverse',
]
methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    // 调用原Array上对应的方法
    oldArrayMethods[method].call(this, ...args)
    // 当数组添加一个对象时,也要进行observe
    let insert
    switch (method) {
      case 'push':
      case 'unshift':
        insert = args
        break
      case 'splice':
        insert = args.slice(2)
        break
      default:
        break
    }
    // 此处的this指向的就是调用数组劫持方法的data数据,上面绑定的__ob__属性中,有observeArray方法
    if (insert) this.__ob__.observeArray(insert)
  }
})
