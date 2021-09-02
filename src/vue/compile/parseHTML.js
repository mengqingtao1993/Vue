/**
 * 将template编译成ast抽象语法树
 * 使用正则解析,将解析出来的结果,分类处理
 * 通过入栈出栈,标记闭合标签及父子关系,从而构建ast抽象语法树
 */
let root = null // 树
let stack = [] // 栈
// 创建抽象语法树对象
function createAstElement (tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    parent: null,
    attrs,
  }
}
// 处理开始标签
function start (tagName, attrs) {
  let element = createAstElement(tagName, attrs)
  if (!root) {
    root = element
  }
  // 入栈,并标记parent
  let parent = stack[stack.length - 1]
  if (parent) {
    element.parent = parent
  }
  stack.push(element)
}
// 处理闭合标签
function end (tagName) {
  // 出栈
  let last = stack.pop()
  if (last !== tagName) {
    throw new Error('标签闭合有误')
  }
}
// 处理文本内容
function chars (text) {
  // 拿到栈顶元素,并给该元素children加入文本
  let parent = stack[stack.length - 1]
  parent.children.push({
    type: 3,
    text
  })
}
export function parseHTML (html) {
  // 遍历html,正则匹配所有template,将解析的标签分类处理
  while (html) {
    if (startMatch) {
      start(startMatch.tagName, startMatch.attrs)
      continue
    }
    if (endMatch) {
      end(endMatch.tagName)
      continue
    }
    if (textMatch) {
      chars(textMatch.text)
    }
    if (!html) return
  }
  return root
}