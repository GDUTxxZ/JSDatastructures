// compare(pos1, pos2)
// return true 表示 po1 >= pos2
// return false 表示 pos1 < pos2
function selectionSort (arr, compare) { // 选择排序
  for (let i = arr.length - 1; i >= 0; i--) {
    let pos = i
    for (let j = i - 1; j >= 0; j--) {
      if (compare(arr[pos], arr[j])) {
        pos = j
      }
    }
    let item = arr[pos]
    arr[pos] = arr[i]
    arr[i] = item
  }
  return arr
}
function bubbleSort (arr, compare) { // 冒泡排序
  let flag = true
  function swap (i, j) { // 交换 i，j 两个元素的位置
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    if (flag) {
      flag = false
      for (let j = 0; j < i; j++) {
        if (compare(arr[j], arr[j + 1])) {
          swap(j, j + 1)
          flag = true
        }
      }
    }
  }
  return arr
}
function insertionSort (arr, compare) { // 插入排序
  for (let i = 1; i < arr.length; i++) {
    let pos = 0
    for (let j = 1; j <= i; j++) {
      if (compare(arr[j], arr[i])) {
        break
      } else {
        pos = j
      }
    }
    arr.splice(pos, 0, arr.splice(i, 1))
  }
  return arr
}
function shellSort (arr, compare, d, t) { // 希尔排序,按增量序列d对数组进行t次希尔排序
  function shellInsert (dk) { // 依次排序，dk为增量序列
    for (let i = 0; i < arr.length - dk; i++) {
      if (compare(arr[i], arr[i + dk])) {
        let j = i + dk
        let temp = arr[j]
        do {
          j -= dk
          arr[j + dk] = arr[j]
        } while (j - dk > 0 && compare(arr[j - dk], temp))
        arr[j] = temp
      }
    }
  }
  for (let i = 0; i < t; i++) {
    shellInsert(d[i])
  }
  return arr
}
function mergeSort (arr, compare) { // 归并排序
  if (arr.length === 1) {
    return arr
  }
  function merge (left, right) {
    var result = []
    while (left.length > 0 && right.length > 0) {
      if (compare(right[0], left[0])) {
        result.push(left.shift())
      } else {
        result.push(right.shift())
      }
    }
    return result.concat(left).concat(right)
  }
  let middle = Math.floor(arr.length / 2)
  let left = arr.slice(0, middle)
  let right = arr.slice(middle)
  return merge(left.mergeSort(compare), right.mergeSort(compare))
}
function quickSort (arr, compare) { // 快速排序
  if (arr.length === 1) {
    return
  }
  let middle = arr[0]
  let middlePos = 0
  for (let i = arr.length - 1; i > 0; i--) {
    if (compare(middle, arr[i])) {
      arr.splice(0, 0, arr.splice(i, 1))
      middlePos++
    }
  }
  let left = arr.slice(0, middlePos + 1)
  let right = arr.slice(middlePos + 1)
  return left.quickSort(compare).concat(right.quickSort(compare))
}
function heapSort (arr, compare) { // 堆排序
  // 堆
  function Heap (tag, prior, rcd = []) {
    if (!(tag === 1 || tag === 0) || !prior) {
      return false
    }
    this.rcd = rcd
    this.rcd.unshift(this.tag) // 第一单元放一个标志
    this.tag = tag // 0表示小顶堆 ， 1表示大顶堆
    this.prior = prior
    if (this.rcd.length !== 1) {
      for (let i = Math.floor((this.rcd.length - 1) / 2); i >= 1; i--) {
        this.shiftDown(i)
      }
    }
  }
  Heap.prototype.shiftDown = function (pos) { // 堆筛选
    while (pos <= (this.rcd.length - 1) / 2) { // 不需筛选子叶节点
      let c = pos * 2 // pos的左子节点
      let rc = pos * 2 + 1 // pos的右子节点
      if (rc <= this.rcd.length - 1 && this.prior(this.rcd[rc].key, this.rcd[c].key)) { // 若左右节点均存在
        c = rc // 此时c为更接近根的节点
      }
      if (this.prior(this.rcd[pos].key, this.rcd[c].key)) { // 若根节点位置不需调整
        return
      }
      this.swapElem(pos, c) // 否则交换pos和c
      pos = c // 继续向下筛选
    }
  }
  Heap.prototype.insert = function (data) { // 堆插入
    let curr = this.rcd.length
    this.rcd[curr] = { // 先把元素插入堆尾
      key: data.key,
      value: data.value
    }
    while (curr !== 1 && this.prior(this.rcd[curr].key, this.rcd[Math.floor(curr / 2)].key)) { // 从堆尾向上筛选调整
      this.swapElem(curr, Math.floor(curr / 2))
      curr = Math.floor(curr / 2)
    }
  }
  Heap.prototype.remove = function (pos) { // 堆移除
    let elem = this.rcd[pos] // 获取要移除的元素，用于返回
    this.swapElem(pos, this.rcd.length - 1) // 将该元素与堆尾交换
    this.rcd.splice(this.rcd.length - 1, 1) // 删除堆尾元素
    let curr = pos
    while (curr !== 1 && this.prior(this.rcd[curr].key, this.rcd[Math.floor(curr / 2)].key)) { // 将该结点不断向上交换位置至合适位置
      this.swapElem(curr, Math.floor(curr / 2))
      curr = Math.floor(curr / 2)
    }
    for (let i = curr; i <= this.rcd.length - 1; i++) { // 调整以合适位置的节点为根的子堆
      this.shiftDown(i)
    }
    return elem
  }
  Heap.prototype.swapElem = function (i, j) { // 交换两个堆元素
    if (i <= 0 || j <= 0 || i >= this.rcd.length || j >= this.rcd.length) {
      return false
    }
    let temp = this.rcd[i]
    this.rcd[i] = this.rcd[j]
    this.rcd[j] = temp
    return true
  }
  let heap = new Heap(1, compare, arr)
  for (var i = arr.length - 1; i >= 0; i--) {
    arr[i] = heap.remove(1)
  }
  return arr
}
function radixSort (arr, n) { // 基数排序, n为数据的位数
  arr.map((item) => { return item.toString().split('') })
  for (let i = arr.length - 1; i >= 0; i--) { // 统一位数
    while (arr[i].length < n) {
      arr[i].unshift('0')
    }
  }
  let collection = new Array(9) // 收集数组
  for (let i = n - 1; i >= 0; i--) { // n次排序(收集 + 分配)
    for (let j = arr.length - 1; j >= 0; j--) { // 一次收集，把所有数据放进桶里
      if (collection[arr[j][i]] !== undefined) {
        let p = collection[arr[j][i]]
        while (p.next !== null) {
          p = p.next
        }
        p.next = {
          data: arr[j],
          next: null
        }
      } else {
        collection[arr[j][i]] = {
          data: arr[j],
          next: null
        }
      }
    }
    for (let j = 9; j >= 0; j--) { // 一次分配，把数据放回数组里
      let pos = arr.length - 1
      if (collection[j] !== undefined) { // 桶里有数据
        let p = collection[j]
        while (p !== null) {
          arr[pos--] = p.data
          p = p.next
        }
      }
    }
  }
  arr.map((item) => { return parseInt(item.join('')) })
  return arr
}
