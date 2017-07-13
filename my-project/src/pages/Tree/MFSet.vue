<template>
  <div id="MFSet">
    <h1>并查集</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <div>节点值为(pos, key) （节点在树中的序号，节点的值）</div>
      <canvas width="600" height="400" id="canvas-tree"></canvas>
    </div>
    <div class="show-data">
      <h2>结果：</h2>
      {{result}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <div class="operate-data-item">
        <input type="text" v-model="key" name="key" placeholder="关键字">
        <span class="oprate-data-aux"><=关键字（数字）</span>
      </div>
      <div class="operate-data-item">
        <input type="text" v-model="pos1" name="pos1" placeholder="位置1">
        <span class="oprate-data-aux"><=位置1（数字）</span>
      </div>
      <div class="operate-data-item">
        <input type="text" v-model="pos2" name="pos2" placeholder="位置2">
        <span class="oprate-data-aux"><=位置1（数字）</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="setRootMFSet">插入代表元（关键字）</button>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="insertMFSet">插入元素(关键字， 位置1)</button>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="searchMFSet">查找元素（关键字）</button>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="findMFSet">查找代表元（位置1）</button>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="diffMFSet">判断元素是否在同一集合（位置1，位置2）</button>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="unionMFSet">合并两个元素的集合（位置1， 位置2）</button>
      </div>
    </div>
    <div class="summary">
      <h2>总结：</h2>
      <h3>并查集结构：</h3>
      <pre>
        function MFSetNode (key, parent = null) { // 节点构造
          this.key = key // 节点值
          this.parent = parent // 节点父元素序号
        }
        function MFSet () { // 并查集
          this.nodes = [] // 节点数组
          this.nodeNum = 0 // 节点数量
        }
      </pre>
      <h3>接口：</h3>
      <pre>
        setRoot(key) // 插入一个代表元
        insert(key, pos) // 插入一个以pos为父节点的子节点
        search(key) // 搜索值为Key的节点
        find(pos) // 找到pos所属的集合的代表元(路径压缩法)
        diff(pos1, pos2) // 判断元素是否在同一集合
        union(pos1, pos2) // 合并两个元素的集合
      </pre>
    </div>
  </div>
</template>

<script>
function MFSetNode (key, parent = null) {
  this.key = key
  this.parent = parent
}
function MFSet () {
  this.nodes = []
  this.nodeNum = 0
}
MFSet.prototype.setRoot = function (key) { // 插入一个代表元
  if (this.search(key)) {
    return false
  } else {
    this.nodes.push(new MFSetNode(key))
    this.nodeNum++
    return true
  }
}
MFSet.prototype.insert = function (key, pos) { // 插入一个以pos为父节点的子节点
  if (this.search(key) || pos > this.nodeNum - 1) {
    return false
  } else {
    this.nodes.push(new MFSetNode(key, pos))
    this.nodeNum++
    return true
  }
}
MFSet.prototype.search = function (key) { // 搜索值为Key的节点
  for (let i = this.nodeNum - 1; i >= 0; i--) {
    if (this.nodes[i].key === key) {
      return i
    }
  }
  return false
}
MFSet.prototype.find = function (pos) { // 找到pos所属的集合的代表元(路径压缩法)
  if (pos > this.nodeNum) {
    return false
  } else {
    let node = this.nodes[pos]
    let nodePos = pos
    let nodeList = []
    while (node.parent !== null) {
      nodeList.push(node)
      nodePos = node.parent
      node = this.nodes[nodePos]
    }
    if (nodeList.length > 0) {
      for (let i = nodeList.length - 1; i >= 0; i--) {
        nodeList[i].parent = nodePos
      }
    }
    return node
  }
}
MFSet.prototype.diff = function (pos1, pos2) {
  if (pos1 > this.nodeNum || pos2 > this.nodeNum || this.find(pos1) !== this.find(pos2)) { // 输入不合法或不属于同一集合
    return false
  } else { // 属于同一集合
    return true
  }
}
MFSet.prototype.union = function (pos1, pos2) {
  if (pos1 > this.nodeNum || pos2 > this.nodeNum || this.diff(pos1, pos2)) { // 输入不合法或本就属于同一集合
    return false
  } else {
    this.find(pos1).parent = pos2
  }
}
export default {
  data () {
    return {
      mfset: null,
      pos1: '',
      pos2: '',
      key: '',
      result: '无'
    }
  },
  mounted () {
    this.mfset = new MFSet()
    this.paintTree()
  },
  methods: {
    paintTree () {
      let tree = this.mfset.nodes
      let canvas = document.getElementById('canvas-tree')
      canvas.width = canvas.width
      canvas.height = canvas.height
      let cxt = canvas.getContext('2d')
      cxt.fillStyle = 'black'
      cxt.strokeStyle = 'red'
      cxt.font = '20px serif'
      cxt.textAlign = 'center'
      function paintNode (node, level, left, width, index, totalNum, pos) {
        cxt.beginPath()
        cxt.arc(left + (index - 1) / totalNum * width, (level - 1) * 100 + 50, 25, 0, Math.PI * 2, true)
        cxt.closePath()
        cxt.stroke()
        if (node.key !== null) {
          cxt.fillText('(' + pos + ' , ' + node.key + ')', left + (index - 1) / totalNum * width, (level - 1) * 100 + 50)
        }
        if (level !== 1) {
          cxt.moveTo(left, (level - 2) * 100 + 50)
          cxt.lineTo(left + (index - 1) / totalNum * width, (level - 1) * 100 + 50)
          cxt.stroke()
        }
        let childList = []
        for (let i = tree.length - 1; i >= 0; i--) {
          if (tree[i].parent === pos) {
            childList.push(i)
          }
        }
        let childIndex = 1
        childList.forEach((pos) => {
          paintNode(tree[pos], level + 1, left + (index - 1) / totalNum * width, width / totalNum, childIndex++, childList.length, pos)
        })
      }
      let treeList = []
      let left = 0
      for (let i = tree.length - 1; i >= 0; i--) {
        if (tree[i].parent === null) {
          treeList.push(i)
        }
      }
      for (let i = treeList.length - 1; i >= 0; i--) {
        paintNode(tree[treeList[i]], 1, 25 + left, canvas.width / treeList.length, 1, 1, treeList[i])
        left += canvas.width / treeList.length
      }
    },
    setRootMFSet () {
      this.result = this.mfset.setRoot(this.key)
      this.paintTree()
    },
    insertMFSet () {
      this.result = this.mfset.insert(this.key, parseInt(this.pos1))
      this.paintTree()
    },
    searchMFSet () {
      this.result = this.mfset.search(this.key)
    },
    findMFSet () {
      this.result = this.mfset.find(parseInt(this.pos1))
      this.paintTree()
    },
    diffMFSet () {
      this.result = this.mfset.diff(parseInt(this.pos1), parseInt(this.pos2))
      this.paintTree()
    },
    unionMFSet () {
      this.result = this.mfset.union(parseInt(this.pos1), parseInt(this.pos2))
      this.paintTree()
    }
  }
}
</script>

<style scoped>
#MFSet {
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
  width: 400px;
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
.summary pre {
  text-align: left
}
</style>
