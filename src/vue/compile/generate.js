/**
 * 遍历树,将树拼接成字符串函数,并返回
 * _c创建元素节点
 * _v创建文本节点
 * _s处理children中的变量
 */
// 解析属性
function genProps (attrs) {
  let str = ''
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i]
    // 这里还有个处理style的东西
    str += `${attr.name}:${JSON.stringify(attr.value)},`
  }
  return `{${str.slice(0, -1)}}`//删掉最后一个逗号
}
// 解析子元素
function genChildren (el) {
  let children = el.children
  if (children) {
    return children.map(c => gen(c)).join()
  }
  return false
}
// 核心方法
function gen (el) {
  if (el.type === 1) {
    return generate(el)// 如果是元素,则继续递归解析
  } else {
    let text = el.text
    // 这里还要处理{{}}的情况,拆分为变量处理,使用_s处理
    return `_v('${text}')`
  }
}
export function generate (el) {
  let children = genChildren(el)
  // 希望得到_c('div',{id:1},'hello')
  let code = `_c('${el.tag}',
  ${el.attrs.length ? genProps(el.attrs) : 'undefined'})
  ${children ? `,${children}` : ''}`
  return code
}
