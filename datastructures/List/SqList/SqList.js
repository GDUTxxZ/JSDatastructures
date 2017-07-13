// 顺序表
function SqList () {
  let sq_list = []
  sq_list.clearList = function () { // 清空表
    sq_list = []
    return true
  }
  sq_list.isEmpty = function () { // 判空
    if (sq_list.length < 1) {
      return true
    } else {
      return false
    }
  }
  sq_list.getLength = function () { // 表长度
    return sq_list.length
  }
  sq_list.getElem = function (pos) { // 获取序号为i的元素
    if (pos < sq_list.length - 1) {
      return sq_list[pos]
    } else {
      return false
    }
  }
  sq_list.search = function (value) { // 查找值为value的元素的序号
    let length = sq_list.length - 1
    for (let i = 0; i < length; i++) {
      if (sq_list[i] === value) {
        return i
      }
    }
    return false
  }
  sq_list.traverse = function (callback) { // 遍历表，对每一个元素调用callback
    for (let i = sq_list.length - 1; i >= 0; i--) {
      callback(sq_list[i])
      if (i === 0) {
        return true
      }
    }
    return false
  }
  sq_list.putElem = function (pos, value) {
    if (pos < sq_list.length - 1) {
      sq_list[pos] = value
      return true
    } else {
      return false
    }
  }
  sq_list.append = function (value) {
    sq_list.push(value)
    return true
  }
  sq_list.delete = function () {
    if (sq_list.length < 1) {
      return false
    } else {
      return sq_list.pop()
    }
  }
}