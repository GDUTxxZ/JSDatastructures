// 链栈
function LinkStack (value) {
  this.value = null
  this.next = null
  if (value) { this.value = value }
}
LinkStack.prototype.isEmpty = function () {
  if (this.value === null) return true
  else return false
}
LinkStack.prototype.push = function (value) {
  let linkStack = this
  if (!this.value) {
    this.value = value
    return
  }
  while (linkStack.next) {
    linkStack = linkStack.next
  }
  linkStack.next = {
    value: value,
    next: null
  }
}
LinkStack.prototype.pop = function () {
  let linkStack = this
  if (this.isEmpty()) { return false }
  if (linkStack.next === null) {
    let returnData = linkStack.value
    this.value = null
    return returnData
  } else {
    while (linkStack.next.next) {
      linkStack = linkStack.next
    }
    let returnData = linkStack.next.value
    linkStack.next = null
    return returnData
  }
}
LinkStack.prototype.clearStack = function () {
  this.value = null
  this.next = null
}
LinkStack.prototype.getTopStack = function () {
  let linkStack = this
  if (this.isEmpty()) { return false }
  while (linkStack.next) {
    linkStack = linkStack.next
  }
  return linkStack.value
}