// 顺序栈
function SqStack () {
  let sq_stack = []
  sq_stack.clearStack = function () {
    sq_stack = []
  }
  sq_stack.getTopStack = function () {
    if (sq_stack.isEmpty()) {
      return false
    } else {
      return sq_stack[sq_stack.length - 1]
    }
  }
  sq_stack.isEmpty = function () {
    if (sq_stack.length < 1) {
      return true
    } else {
      return false
    }
  }
}