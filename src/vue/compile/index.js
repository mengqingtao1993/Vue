/**
 * 通过parseHTML将template编译成ast抽象语法树
 * 通过generate将ast抽象语法树编译成render函数
 */
import { generate } from './generate'
import { parseHTML } from './parseHTML'
export const compileToFunction = function (template) {
  let root = parseHTML(template) // 返回ast抽象语法树
  let code = generate(root) // 返回一个拼好的字符串,就是render函数
  let render = new Function(`with(this){return ${code}}`) // 将字符串转成函数
  // 模板引擎实现原理:with+new Function
  return render
}
