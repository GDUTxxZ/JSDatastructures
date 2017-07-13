<template>
  <div id="PCTree">
    <h1>树——双亲孩子表示法</h1>
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
        <input type="text" v-model="pos" name="pos" placeholder="位置">
        <span class="oprate-data-aux"><=位置（数字）</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="insertPCTree">插入</button>
        <button @click.stop.prevent="searchPCTree">查找</button>
        <button @click.stop.prevent="updatePCTree">更新</button>
        <button @click.stop.prevent="preOrderTraverse">先序遍历</button>
        <button @click.stop.prevent="postOrderTraverse">后序遍历</button>
      </div>
    </div>
    <div class="summary">
      <h2>总结：</h2>
      <h3>树——双亲孩子表示法结构：</h3>
      <pre>
        function ChildNode (childIndex) {
          this.childIndex = childIndex // 孩子在节点数组中的序号
          this.nextChild = null // 下一个ChildNode
        }
        function PCTreeNode (key, parent = null) {
          this.key = key // 节点值
          this.parent = parent // 父节点的序号
          this.children = null // 孩子序号链表的指针
        }
        function PCTree () {
          this.nodes = [] // 节点数组
          this.nodeNum = 0 // 节点个数
        }
      </pre>
      <h3>接口：</h3>
      <pre>
        insert(key, pos) // 插入值为Key的节点，作为pos节点的子节点
        search(key) // 搜索值为key的节点
        update(pos, newKey) // 更新pos节点的值为newKey
        preOrderTraverse(callback) // 先序遍历
        postOrderTraverse(callback) // 后序遍历
      </pre>
    </div>
  </div>
</template>

<script>
function ChildNode (childIndex) {
  this.childIndex = childIndex
  this.nextChild = null
}
function PCTreeNode (key, parent = null) {
  this.key = key
  this.parent = parent
  this.children = null
}
function PCTree () {
  this.nodes = []
  this.nodeNum = 0
}
PCTree.prototype.insert = function (key, pos = null) {
  if (pos > this.nodeNum - 1 || this.search(key)) {
    return false
  }
  if (this.nodeNum === 0) {
    this.nodes.push(new PCTreeNode(key))
  } else {
    this.nodes.push(new PCTreeNode(key, pos))
    let parent = this.nodes[pos]
    let child = parent.children
    if (child === null) {
      parent.children = new ChildNode(this.nodeNum)
    } else {
      while (child.nextChild !== null) {
        child = child.nextChild
      }
      child.nextChild = new ChildNode(this.nodeNum)
    }
  }
  this.nodeNum++
  return true
}
PCTree.prototype.search = function (key) {
  for (let i = this.nodeNum - 1; i >= 0; i--) {
    if (this.nodes[i].key === key) {
      return this.nodes[i]
    }
  }
  return false
}
PCTree.prototype.update = function (pos, newKey) {
  if (pos > this.nodeNum - 1 || this.search(newKey)) {
    return false
  }
  this.nodes[pos].key = newKey
  return true
}
PCTree.prototype.preOrderTraverse = function (callback) {
  function traverse (pos) {
    callback(this.nodes[pos].key)
    let child = this.nodes[pos].children
    while (child !== null) {
      traverse.call(this, child.childIndex)
      child = child.nextChild
    }
  }
  traverse.call(this, 0)
}
PCTree.prototype.postOrderTraverse = function (callback) {
  function traverse (pos) {
    let child = this.nodes[pos].children
    while (child !== null) {
      traverse.call(this, child.childIndex)
      child = child.nextChild
    }
    callback(this.nodes[pos].key)
  }
  traverse.call(this, 0)
}
export default {
  data () {
    return {
      pctree: null,
      pos: '',
      key: '',
      result: '无'
    }
  },
  mounted () {
    this.pctree = new PCTree()
    this.paintTree()
  },
  methods: {
    paintTree () {
      let tree = this.pctree.nodes
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
        let child = node.children
        let childList = []
        while (child !== null) {
          childList.push(child.childIndex)
          child = child.nextChild
        }
        let childIndex = 1
        childList.forEach((pos) => {
          paintNode(tree[pos], level + 1, left + (index - 1) / totalNum * width, width / totalNum, childIndex++, childList.length, pos)
        })
      }
      paintNode(tree[0], 1, 25, canvas.width, 1, 1, 0)
    },
    insertPCTree () {
      this.result = this.pctree.insert(this.key, parseInt(this.pos))
      console.log(this.pctree)
      this.paintTree()
    },
    searchPCTree () {
      this.result = this.pctree.search(this.key)
    },
    updatePCTree () {
      this.result = this.pctree.update(parseInt(this.pos), this.key)
      this.paintTree()
    },
    preOrderTraverse () {
      let result = ''
      this.pctree.preOrderTraverse((value) => {
        result += value
      })
      this.result = result
    },
    postOrderTraverse () {
      let result = ''
      this.pctree.postOrderTraverse((value) => {
        result += value
      })
      this.result = result
    }
  }
}
</script>

<style scoped>
#PCTree {
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
  width: 100px;
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
  text-align: left;
}
</style>
