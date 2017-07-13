<template>
  <div id="BSTree">
    <h1>二叉查找树</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <div>{{bstree}}</div>
      <canvas width="600" height="400" id="canvas-tree"></canvas>
    </div>
    <div class="show-data">
      <h2>结果：</h2>
      {{result}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <div class="operate-data-item">
        <button @click.stop.prevent="insertBSTree">插入</button>
        <input type="text" v-model="insertData" name="insertData" placeholder="数据">
        <span class="oprate-data-aux"><=数据（数字）</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="deleteBSTree">删除</button>
        <input type="text" v-model="deleteKey" name="deleteKey" placeholder="关键字">
        <span class="oprate-data-aux"><=关键字</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="searchBSTree">查找</button>
        <input type="text" v-model="searchKey" name="searchKey" placeholder="关键字">
        <span class="oprate-data-aux"><=关键字</span>
      </div>
    </div>
    <div class="summary">
      <h2>总结：</h2>
      <h3>二叉查找树结构：</h3>
      <pre>
        {
          data // 数据
          LTree // 左子树
          RTree // 右子树
        }
      </pre>
      <h3>接口：</h3>
      <pre>
        search(key) // 按关键字查找，查无返回false
        insert(data) // 插入数据，成功返回true，失败返回false
        delete(key) // 按关键字删除，成功返回删除的数据，失败返回false
      </pre>
    </div>
  </div>
</template>

<script>
// 二叉搜索树
function BSTreeNode (data = null, LTree = null, RTree = null) {
  this.data = data
  this.LTree = LTree
  this.RTree = RTree
}
function BSTree (data = null, LTree = null, RTree = null) {
  if (data !== null) {
    this.root = new BSTreeNode(data, LTree, RTree)
  } else {
    this.root = null
  }
}
BSTree.prototype.isEmpty = function () {
  if (this.root === null) {
    return true
  } else {
    return false
  }
}
BSTree.prototype.search = function (key) {
  if (this.isEmpty()) {
    return false
  } else {
    return this.root.search(key)
  }
}
BSTreeNode.prototype.search = function (key) {
  if (key === this.data) { // 查找成功，返回查找值
    return this
  } else if (key > this.data && this.RTree !== null) { // 递归查找左子树
    return this.RTree.search(key)
  } else if (key < this.data && this.LTree !== null) { // 递归查找右子树
    return this.LTree.search(key)
  } else {
    return false
  }
}
BSTree.prototype.insert = function (data) {
  if (this.root === null) {
    this.root = new BSTreeNode(data)
    return true
  } else {
    return this.root.insert(data)
  }
}
BSTreeNode.prototype.insert = function (data) {
  if (data === this.data) { // 发现已有该关键字的节点
    return false
  } else if (data > this.data) { // 递归插入右子树
    if (this.RTree === null) {
      this.RTree = new BSTreeNode(data)
      return true
    } else {
      return this.RTree.insert(data)
    }
  } else if (data < this.data) { // 递归插入左子树
    if (this.LTree === null) {
      this.LTree = new BSTreeNode(data)
      return true
    } else {
      return this.LTree.insert(data)
    }
  }
}
BSTree.prototype.delete = function (key) {
  if (this.root === null) {
    return false
  } else if (this.root.data === key) {
    this.root = null
    return true
  } else {
    this.root.delete(key)
  }
}
BSTreeNode.prototype.delete = function (key) {
  if (this.LTree !== null) {
    let leftData = this.LTree.data
    if (key === leftData) {
      if (this.LTree.LTree === null && this.LTree.RTree === null) { // 若为子叶节点
        this.LTree = null
      } else if (this.LTree.LTree === null) { // 若只有右子树，直接用右子树代替
        this.LTree = this.LTree.RTree
      } else if (this.LTree.RTree === null) { // 若只有左子树，直接用左子树代替
        this.LTree = this.LTree.LTree
      } else { // 既有左子树也有右子树，则取左孩子的最右结点替换自身
        let itemParent = this.LTree
        let item = itemParent.LTree
        while (item.RTree !== null) {
          itemParent = item
          item = item.RTree
        }
        if (itemParent === this.LTree) { // 左孩子没有右子树,item就是this.LTree.LTree
          item.RTree = itemParent.RTree
          itemParent = item
        } else {
          itemParent.RTree = item.LTree
          item.LTree = this.LTree.LTree
          item.RTree = this.LTree.RTree
          this.LTree = item
        }
      }
      return leftData
    }
    if (key < this.data) {
      return this.LTree.delete(key)
    }
  }
  if (this.RTree !== null) {
    let rightData = this.RTree.data
    if (key === rightData) {
      if (this.RTree.LTree === null && this.RTree.RTree === null) { // 若为子叶节点
        this.RTree = null
      } else if (this.RTree.LTree === null) { // 若只有右子树，直接用右子树代替
        this.RTree = this.RTree.RTree
      } else if (this.RTree.RTree === null) { // 若只有左子树，直接用左子树代替
        this.RTree = this.RTree.LTree
      } else { // 既有左子树也有右子树，则取左孩子的最右结点替换自身
        let itemParent = this.RTree
        let item = itemParent.LTree
        while (item.RTree !== null) {
          itemParent = item
          item = item.RTree
        }
        if (itemParent === this.RTree) { // 左孩子没有右子树,item就是this.RTree.LTree
          item.RTree = itemParent.RTree
          itemParent = item
        } else {
          itemParent.RTree = item.LTree
          item.LTree = this.RTree.LTree
          item.RTree = this.RTree.RTree
          this.RTree = item
        }
      }
      return rightData
    }
    if (key > this.data) {
      return this.RTree.delete(key)
    }
  }
  return false
}
BSTree.prototype.preOrderTraverse = function (callbak) {
  if (this.root === null) {
    return false
  } else {
    return this.root.preOrderTraverse(callbak)
  }
}
BSTree.prototype.inOrderTraverse = function (callbak) {
  if (this.root === null) {
    return false
  } else {
    return this.root.inOrderTraverse(callbak)
  }
}
BSTree.prototype.postOrderTraverse = function (callbak) {
  if (this.root === null) {
    return false
  } else {
    return this.root.postOrderTraverse(callbak)
  }
}
BSTreeNode.prototype.preOrderTraverse = function (callback) {
  callback(this.data)
  if (this.LTree) {
    this.LTree.preOrderTraverse(callback)
  }
  if (this.RTree) {
    this.RTree.preOrderTraverse(callback)
  }
}
BSTreeNode.prototype.inOrderTraverse = function (callback) {
  if (this.LTree) {
    this.LTree.inOrderTraverse(callback)
  }
  callback(this.data)
  if (this.RTree) {
    this.RTree.inOrderTraverse(callback)
  }
}
BSTreeNode.prototype.postOrderTraverse = function (callback) {
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
      bstree: null,
      insertData: '',
      deleteKey: '',
      searchKey: '',
      result: '无'
    }
  },
  mounted () {
    this.bstree = new BSTree()
  },
  methods: {
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
        if (tree.data !== null) {
          cxt.fillText(tree.data, 600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50)
        }
        if (level !== 1) {
          cxt.moveTo(600 / (Math.pow(2, level - 2) + 1) * parentIndex, (level - 2) * 100 + 50)
          cxt.lineTo(600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50)
          cxt.stroke()
        }
        if (tree.LTree) paintNode(tree.LTree, level + 1, index * 2 - 1)
        if (tree.RTree) paintNode(tree.RTree, level + 1, index * 2)
      }
      paintNode(this.bstree.root, 1, 1)
    },
    insertBSTree () {
      this.result = this.bstree.insert(parseInt(this.insertData))
      this.paintTree()
    },
    deleteBSTree () {
      this.result = this.bstree.delete(parseInt(this.deleteKey))
      this.paintTree()
    },
    searchBSTree () {
      this.result = this.bstree.search(parseInt(this.searchKey))
      this.paintTree()
    }
  }
}
</script>

<style scoped>
#BSTree {
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
