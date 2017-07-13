// 链队列
function LinkQueue (value = null) {
  this.value = value
  this.next = null
}
LinkQueue.prototype.isEmpty = function () { // this是头节点，因此this.next存在队列才不为空
  if (this.next) {
    return false
  } else {
    return true
  }
}
LinkQueue.prototype.enQueue = function (value) {
  let queue = this
  while (queue.next) { // 找到队尾
    queue = queue.next
  }
  queue.next = new LinkQueue(value) // 入队
}
LinkQueue.prototype.deQueue = function () {
  if (this.isEmpty()) { // 判空
    return false
  } else { // 返回对头的值并删除该节点
    let returnData = this.next.value
    this.next = this.next.next
    return returnData
  }
}
LinkQueue.prototype.getHeadQueue = function () {
  if (this.isEmpty()) {
    return false
  } else {
    return this.next.value
  }
}
LinkQueue.prototype.clearQueue = function () {
  this.next = null
}