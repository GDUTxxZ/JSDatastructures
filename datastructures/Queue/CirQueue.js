// 循环队列
function CirQueue () {
  let cir_queue = []
  cir_queue.enQueue = function (elem) {
    cir_queue.push(elem)
  }
  cir_queue.deQueue = function () {
    if (cir_queue.isEmpty()) {
      return false
    } else {
      return cir_queue.shift()
    }
  }
  cir_queue.clearQueue = function () {
    cir_queue = []
  }
  cir_queue.isEmpty = function () {
    if (cir_queue.length < 1) {
      return true
    } else {
      return false
    }
  }
  cir_queue.getHeadQueue = function {
    if (cir_queue.isEmpty()) {
      return false
    } else {
      return cir_queue[0]
    }
  }
}