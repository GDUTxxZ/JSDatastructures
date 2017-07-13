<template>
  <div id="BiTree">
    <h1>二叉树</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <div>{{bitree}}</div>
      <canvas width="600" height="400" id="canvas-tree"></canvas>
    </div>
    <div class="show-data">
      <h2>结果：</h2>
      {{result}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="makeBiTree">创建二叉树</button>
      <div class="operate-data-item">
        <button @click.stop.prevent="search">选择节点</button>
        <input type="text" v-model="searchKey" name="searchKey" placeholder="关键字">
        <span class="oprate-data-aux"><=数据</span>
      </div>
      <button @click.stop.prevent="replaceLeft">替换左子树</button>
      <button @click.stop.prevent="replaceRight">替换右子树</button>
      <button @click.stop.prevent="preOrderTraverse">先序遍历</button>
      <button @click.stop.prevent="inOrderTraverse">中序遍历</button>
      <button @click.stop.prevent="postOrderTraverse">后序遍历</button>
    </div>
    <div class="summary">
      <h2>总结：输入数据来操作二叉树太繁琐，这里的操作都是简化过的，只为了显示二叉树结构的功能</h2>
      <h3>二叉树结构：</h3>
      <pre>
        {
          data // 数据
          LTree // 左子树
          RTree // 右子树
        }
      </pre>
      <h3>接口：</h3>
      <pre>
        isEmpty() // 二叉树判空，空返回true, 非空返回false
        replaceLeft(newTree) // 替换左子树，newTree为替换的子树，该方法返回替换出的节点
        replaceRight(newTree) // 替换右子树，newTree为替换的子树，该方法返回替换出的节点
        preOrderTraverse(callback) // 先序遍历，callback为对节点数据的访问函数
        inOrderTraverse(callback) // 中序遍历，callback为对节点数据的访问函数
        postOrderTraverse(callback) // 后序遍历，callback为对节点数据的访问函数
      </pre>
    </div>
  </div>
</template>

<script>
// 二叉树
function BiTreeNode (data = null, LTree = null, RTree = null) {
  this.data = data
  this.LTree = LTree
  this.RTree = RTree
}
function BiTree (data = null, LTree = null, RTree = null) {
  if (data !== null) {
    this.root = new BiTreeNode(data, LTree, RTree)
  } else {
    this.root = null
  }
}
BiTree.prototype.isEmpty = function () {
  if (this.root === null) {
    return true
  } else {
    return false
  }
}
BiTree.prototype.search = function (data) {
  if (this.root === null) {
    return false
  } else {
    return this.root.search(data)
  }
}
BiTreeNode.prototype.search = function (data) {
  if (data === this.data) {
    return this
  } else {
    let result = null
    if (this.LTree && result === null) {
      result = this.LTree.search(data)
    }
    if (this.RTree && result === null) {
      result = this.RTree.search(data)
    }
    return result
  }
}
BiTreeNode.prototype.replaceLeft = function (data) {
  let temp = this.LTree
  this.LTree = new BiTreeNode(data)
  return temp
}
BiTreeNode.prototype.replaceRight = function (data) {
  let temp = this.RTree
  this.RTree = new BiTreeNode(data)
  return temp
}
BiTree.prototype.preOrderTraverse = function (callback) {
  if (this.root === null) {
    return false
  } else {
    this.root.preOrderTraverse(callback)
    return true
  }
}
BiTree.prototype.postOrderTraverse = function (callback) {
  if (this.root === null) {
    return false
  } else {
    this.root.postOrderTraverse(callback)
    return true
  }
}
BiTree.prototype.inOrderTraverse = function (callback) {
  if (this.root === null) {
    return false
  } else {
    this.root.inOrderTraverse(callback)
    return true
  }
}
BiTreeNode.prototype.preOrderTraverse = function (callback) {
  callback(this.data)
  if (this.LTree) {
    this.LTree.preOrderTraverse(callback)
  }
  if (this.RTree) {
    this.RTree.preOrderTraverse(callback)
  }
}
BiTreeNode.prototype.inOrderTraverse = function (callback) {
  if (this.LTree) {
    this.LTree.inOrderTraverse(callback)
  }
  callback(this.data)
  if (this.RTree) {
    this.RTree.inOrderTraverse(callback)
  }
}
BiTreeNode.prototype.postOrderTraverse = function (callback) {
  if (this.LTree) {
    this.LTree.postOrderTraverse(callback)
  }
  if (this.RTree) {
    this.RTree.postOrderTraverse(callback)
  }
  callback(this.data)
}
export default {
  data () {
    return {
      bitree: null,
      node: null,
      searchKey: 0,
      result: '无'
    }
  },
  methods: {
    makeBiTree () {
      this.bitree = new BiTree(this.getRandomNumber())
      this.result = '无'
      this.paintTree()
    },
    paintTree () {
      let canvas = document.getElementById('canvas-tree')
      let cxt = canvas.getContext('2d')
      canvas.width = canvas.width
      canvas.height = canvas.height
      function paintNode (tree, level, index) {
        let parentIndex = Math.ceil(index / 2)
        cxt.fillStyle = 'black'
        cxt.strokeStyle = 'red'
        cxt.beginPath()
        cxt.arc(600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50, 30, 0, Math.PI * 2, true)
        cxt.closePath()
        cxt.stroke()
        cxt.font = '30px serif'
        cxt.textAlign = 'center'
        cxt.fillText(tree.data, 600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50)
        if (level !== 1) {
          cxt.moveTo(600 / (Math.pow(2, level - 2) + 1) * parentIndex, (level - 2) * 100 + 50)
          cxt.lineTo(600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50)
          cxt.stroke()
        }
        if (tree.LTree) paintNode(tree.LTree, level + 1, index * 2 - 1)
        if (tree.RTree) paintNode(tree.RTree, level + 1, index * 2)
      }
      paintNode(this.bitree.root, 1, 1)
    },
    search () {
      this.node = this.bitree.search(parseInt(this.searchKey))
      this.result = this.node
    },
    replaceLeft () {
      this.result = this.node.replaceLeft(this.getRandomNumber())
      this.paintTree()
    },
    replaceRight () {
      this.result = this.node.replaceRight(this.getRandomNumber())
      this.paintTree()
    },
    preOrderTraverse () {
      this.result = []
      this.bitree.preOrderTraverse((value) => {
        this.result.push(value)
      })
      this.result = this.result.join(',')
    },
    inOrderTraverse () {
      this.result = []
      this.bitree.inOrderTraverse((value) => {
        this.result.push(value)
      })
      this.result = this.result.join(',')
    },
    postOrderTraverse () {
      this.result = []
      this.bitree.postOrderTraverse((value) => {
        this.result.push(value)
      })
      this.result = this.result.join(',')
    }
  }
}
</script>

<style scoped>
#BiTree {
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
</style>
