<template>
  <div id="Sort">
    <h1>排序算法</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <span class="view-item" v-for="item in data">{{item}}</span>
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="create">重置数组</button>
      <button @click.stop.prevent="selectionSort">选择排序</button>
      <button @click.stop.prevent="bubbleSort">冒泡排序</button>
      <button @click.stop.prevent="insertionSort">插入排序</button>
      <button @click.stop.prevent="shellSort">希尔排序</button>
      <button @click.stop.prevent="mergeSort">归并排序</button>
      <button @click.stop.prevent="quickSort">快速排序</button>
      <button @click.stop.prevent="heapSort">堆排序</button>
      <button @click.stop.prevent="radixSort">基数排序</button>
    </div>
  </div>
</template>

<script>
// compare(pos1, pos2)
// return true 表示 po1 >= pos2
// return false 表示 pos1 < pos2
function selectionSort (arr, compare) { // 选择排序
  for (let i = arr.length - 1; i >= 0; i--) {
    let pos = i
    for (let j = i - 1; j >= 0; j--) {
      if (compare(arr[j], arr[pos])) {
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
    for (let j = 0; j <= i; j++) {
      if (compare(arr[i], arr[j])) {
        pos = j
      } else {
        pos = j
        break
      }
    }
    arr.splice(pos, 0, arr.splice(i, 1)[0])
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
  return merge(mergeSort(left, compare), mergeSort(right, compare))
}
function quickSort (arr, compare) { // 快速排序
  if (arr.length === 1 || arr.length === 0) {
    return arr
  }
  let middle = arr[0]
  let middlePos = 0
  let flag = false
  for (let i = arr.length - 1; i > 0 && i > middlePos; i--) {
    if (compare(middle, arr[i])) {
      arr.unshift(arr.splice(i, 1)[0])
      middlePos++
      i++
      flag = true
    }
  }
  if (flag) {
    let left = arr.splice(0, middlePos)
    let right = arr.splice(1)
    return quickSort(left, compare).concat(middle, quickSort(right, compare))
  } else {
    return [arr[0]].concat(quickSort(arr.splice(1), compare))
  }
}
function heapSort (arr, compare) { // 堆排序
  // 堆
  function Heap (tag, prior, rcd = []) {
    if (!(tag === 1 || tag === 0) || !prior) {
      return false
    }
    this.rcd = []
    this.tag = tag // 0表示小顶堆 ， 1表示大顶堆
    this.prior = prior
    this.rcd.unshift(this.tag) // 第一单元放一个标志
    for (let i = rcd.length - 1; i >= 0; i--) {
      this.insert({
        key: rcd[i],
        value: rcd[i]
      })
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
  console.log(heap)
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = heap.remove(1).value
  }
  return arr
}
function radixSort (arr, n) { // 基数排序, n为数据的位数
  arr = arr.map((item) => { return item.toString().split('') })
  for (let i = arr.length - 1; i >= 0; i--) { // 统一位数
    while (arr[i].length < n) {
      arr[i].unshift('0')
    }
  }
  for (let i = n - 1; i >= 0; i--) { // n次排序(收集 + 分配)
    let collection = new Array(9) // 收集数组
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
    let pos = arr.length - 1
    for (let j = 9; j >= 0; j--) { // 一次分配，把数据放回数组里
      if (collection[j] !== undefined) { // 桶里有数据
        let p = collection[j]
        while (p !== null) {
          arr[pos--] = p.data
          p = p.next
        }
      }
    }
  }
  arr = arr.map((item) => { return parseInt(item.join('')) })
  return arr
}
export default {
  data () {
    return {
      data: [],
      pop_num: '无'
    }
  },
  methods: {
    create () {
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(Math.floor(Math.random() * 1000))
      }
    },
    compare (i, j) {
      return i >= j
    },
    selectionSort () {
      let arr = selectionSort(this.data, this.compare)
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(arr[i])
      }
    },
    bubbleSort () {
      let arr = bubbleSort(this.data, this.compare)
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(arr[i])
      }
    },
    insertionSort () {
      let arr = insertionSort(this.data, this.compare)
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(arr[i])
      }
    },
    shellSort () {
      let arr = shellSort(this.data, this.compare, [5, 3, 1], 3)
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(arr[i])
      }
    },
    mergeSort () {
      let arr = mergeSort(this.data, this.compare)
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(arr[i])
      }
    },
    quickSort () {
      let arr = quickSort(this.data, this.compare)
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(arr[i])
      }
    },
    heapSort () {
      let arr = heapSort(this.data, this.compare)
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(arr[i])
      }
    },
    radixSort () {
      let arr = radixSort(this.data, 3)
      this.data = []
      for (let i = 0; i < 10; i++) {
        this.data.push(arr[i])
      }
    }
  }
}
</script>

<style scoped>
#Sort {
  font-size: 30px;
}
.show-view {
  background-color: #adf;
}
.view-item {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 5px;
  line-height: 50px;
  background-color: #fad;
}
.show-data {
  background-color: #fda;
}
.operate-data {
  background-color: #dfa;
}
.operate-data button {
  font-size: 20px;
  border: none;
  background-color: white;
  width: 100px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
}
.summary {
  background-color: #afe;
}
</style>
