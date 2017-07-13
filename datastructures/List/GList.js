// 广义表
function GList () {
  var list = []
  list.isEmpty = function () {
    if (this.length === 0) {
      return true
    } else {
      return false
    }
  }
  list.getDepth = function () { // 通过递归方法求得广义表深度
    return (function getGListDepth (list) {
      if (!Array.isArray(list)) { // 原子代表深度0
        return 0
      }
      if (list === null) { // 代表上次调用的表尾为空，返回1
        return 1
      }
      let head = list[0] // 表头
      let tail = null // 表尾
      if (list.slice && list.length > 1) { // 如果当前表不止一个元素，则取出表尾
        tail = list.slice(1, list.length)
      }
      //递归调用
      let depthHead = getGListDepth(head) + 1 // 表头深度+1
      let depthTail = getGListDepth(tail) // 表尾再次组合为表，因此深度不变
      return depthHead >= depthTail ? depthHead : depthTail // 返回更深的
    })(this)
  }
  list.getHead = function () { // 取得表头
    if (this.isEmpty()) {
      return null
    }
    return this[0]
  }
  list.getTail = function () { // 取得表尾
    if (this.length < 2) { return null }
    return this.slice(1, this.length)
  }
  list.insertHead = function (value) { // 在头部插入
    this.unshift(value)
  }
  list.append = function (value) { // 在尾部插入
    this.push(value)
  }
  list.deleteHead = function () { //从头部删除
    if (this.isEmpty()) { return false }
    return this.shift()
  }
  return list
}