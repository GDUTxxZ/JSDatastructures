<template>
  <div id="Heap">
    <h1>堆</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <canvas width="600" height="400" id="canvas-heap"></canvas>
    </div>
    <div class="show-data">
      <h2>替换出的数据</h2>
      {{result}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <div class="operate-data-item">
        <button @click.stop.prevent="insertHeap">插入</button>
        <input type="text" v-model="insertKey" name="insertKey" placeholder="数据">
        <span class="oprate-data-aux"><=数据（数字）</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="removeHeap">删除</button>
        <input type="text" v-model="removeIndex" name="removeIndex" placeholder="关键字">
        <span class="oprate-data-aux"><=数据序号，从上往下从1开始</span>
      </div>
    </div>
    <div class="summary">
      <h2>总结：</h2>
      <h3>堆结构：</h3>
      <pre>
        {
          rcd: Array // 第一单元放一个标志
          tag: Number // 0表示小顶堆 ， 1表示大顶堆
          prior: 优先级比较函数
        }
      </pre>
      <h3>节点结构：</h3>
      <pre>
        {
          key: //关键字
          value: //值
        }
      </pre>
      <h3>接口：</h3>
      <pre>
        swapElem(i, j) // 交换序号i, j的节点
        shiftDown(pos) // 筛选节点
        insert(data) // 插入一个数据，data包括key和value
        remove(pos) // 删除指定位置的节点并返回
      </pre>
    </div>
  </div>
</template>

<script>
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
export default {
  data () {
    return {
      heap: null,
      insertKey: 0,
      removeIndex: 0,
      result: '无'
    }
  },
  mounted () {
    this.heap = new Heap(0, this.prior, [19, 1, 29, 32, 10])
    this.paintHeap()
  },
  methods: {
    prior (a, b) {
      return a >= b
    },
    insertHeap () {
      this.heap.insert({
        key: parseInt(this.insertKey),
        value: this.insertKey
      })
      this.paintHeap()
    },
    removeHeap () {
      this.result = this.heap.remove(parseInt(this.removeIndex))
      this.paintHeap()
    },
    paintHeap () {
      let canvas = document.getElementById('canvas-heap')
      let cxt = canvas.getContext('2d')
      let heap = this.heap
      canvas.width = canvas.width
      canvas.height = canvas.height
      function paintNode (value, level, index) {
        let parentIndex = Math.ceil(index / 2)
        cxt.fillStyle = 'black'
        cxt.strokeStyle = 'red'
        cxt.beginPath()
        cxt.arc(600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50, 30, 0, Math.PI * 2, true)
        cxt.closePath()
        cxt.stroke()
        cxt.font = '30px serif'
        cxt.textAlign = 'center'
        cxt.fillText(heap.rcd[value].value, 600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50)
        if (level !== 1) {
          cxt.moveTo(600 / (Math.pow(2, level - 2) + 1) * parentIndex, (level - 2) * 100 + 50)
          cxt.lineTo(600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50)
          cxt.stroke()
        }
        if (heap.rcd[value * 2]) paintNode(value * 2, level + 1, index * 2 - 1)
        if (heap.rcd[value * 2 + 1]) paintNode(value * 2 + 1, level + 1, index * 2)
      }
      paintNode(1, 1, 1)
    }
  }
}
</script>

<style scoped>
#Heap {
  font-size: 20px;
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
  width: 70px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
}
.operate-data input {
  width: 100px;
  height: 37px;
  padding: 0;
  position: relative;
  right: 17px;
  bottom: 4px;
  text-align: center;
}
.oprate-data-aux {
  font-size: 20px;
  position: relative;
  right: 17px;
}
.summary {
  background-color: #afe;
}
</style>
