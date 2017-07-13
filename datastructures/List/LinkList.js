// 链表
function LinkList (value = 0) {
  this.value = value // 初始化时，0代表当前表长为0
  this.next = null
}
LinkList.prototype.getLength = function () {
  return this.value
}
LinkList.prototype.isEmpty = function () {
  if (this.value === 0) {
    return true
  } else {
    return false
  }
}
LinkList.prototype.searchData = function (value) {
  var listNode = this.next
  while (listNode.value !== value && listNode.next !== null) {
    listNode = listNode.next
  }
  return listNode
}
LinkList.prototype.insertData = function (linkNode, value) {
  if (linkNode === null) { return false }
  linkNode.next = {
    value: value,
    next: linkNode.next
  }
  this.value++
}
LinkList.prototype.deletData = function (linkNode) {
  if (linkNode === null || linkNode.next === null) {
    return false
  } else {
    let result = linkNode.next
    linkNode.next = linkNode.next.next
    return result
  }
}
LinkList.prototype.sortList = function (sortFunc) {
  if (this.isEmpty()) {
    return false
  }
  let list = this.next
  let newData = []
  for (let i = this.value - 1; i >= 0; i--) {
    newData.push(list.value)
    list = list.next
  }
  newData.sort(sortFunc)
  list = this.next
  for (let i = this.value - 1; i >= 0; i--) {
    list.value = newData[i]
    list = list.next
  }
}
LinkList.prototype.inverseList = function () {
  if (this.isEmpty()) {
    return false
  }
  let link = this.next
  let newData = []
  for (let i = this.value - 1; i >= 0; i--) {
    newData.push(link.value)
    link = link.next
  }
  link = this.next
  for (let i = this.value - 1; i >= 0; i--) {
    link.value = newData[i]
    link = link.next
  }
}