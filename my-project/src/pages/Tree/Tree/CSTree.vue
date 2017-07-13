<template>
  <div id="CSTree">
    <h1>树——孩子兄弟表示法</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <canvas width="600" height="400" id="canvas-tree"></canvas>
    </div>
    <div class="show-data">
      <h2>结果：</h2>
      {{result}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <div class="operate-data-item">
        <input type="text" v-model="key" name="key" placeholder="查询用关键字">
        <span class="oprate-data-aux"><=查询用关键字</span>
      </div>
      <div class="operate-data-item">
        <input type="text" v-model="newKey" name="newKey" placeholder="插入用关键字">
        <span class="oprate-data-aux"><=插入用关键字</span>
      </div>
      <button @click.stop.prevent="insertCSTree">插入</button>
      <button @click.stop.prevent="searchCSTree">查找</button>
      <button @click.stop.prevent="updateCSTree">更新</button>
      <button @click.stop.prevent="preOrderTraverse">先序遍历</button>
      <button @click.stop.prevent="postOrderTraverse">后序遍历</button>
    </div>
    <div class="summary">
      <h2>总结：</h2>
      <h3>树——孩子兄弟表示法结构：</h3>
      <pre>
        {
          key // 节点的值
          firstChild // 节点第一个孩子的指针
          nextSibling // 节点兄弟指针
        }
      </pre>
      <h3>接口：</h3>
      <pre>
        search(key) // 搜索值为key的节点
        insert(key, index, childKey) // 插入值为childKey的节点，作为值为Key的节点的第index个子节点
        update(key, newKey) // 更新值为key节点的值为newKey
        preOrderTraverse(callback) // 先序遍历
        postOrderTraverse(callback) // 后序遍历
      </pre>
    </div>
  </div>
</template>

<script>
function CSTreeNode (key, firstChild = null, nextSibling = null) {
  this.key = key
  this.firstChild = firstChild
  this.nextSibling = nextSibling
}
CSTreeNode.prototype.insert = function (index, key) { // 把key插入，作为该节点子树第index个子树
  if (index === 1) {
    if (this.firstChild) {
      this.firstChild = new CSTreeNode(key, null, this.firstChild)
    } else {
      this.firstChild = new CSTreeNode(key)
    }
    return true
  } else {
    let child = this.firstChild
    let i = 1
    while (child !== null) {
      if (i === index - 1) {
        child.nextSibling = new CSTreeNode(key, null, child.nextSibling)
        return true
      }
      child = child.nextSibling
      i++
    }
    return false
  }
}
function CSTree () {
  this.root = null
}
CSTree.prototype.search = function (key) {
  if (this.root === null) {
    return false
  }
  function search (node, key) {
    if (node === null) {
      return false
    } else if (node.key === key) {
      return node
    } else {
      let result = false
      result = search(node.firstChild, key)
      if (!result) {
        result = search(node.nextSibling, key)
      }
      return result
    }
  }
  return search(this.root, key)
}
CSTree.prototype.insert = function (key, index, childKey) {
  if (this.root === null) {
    this.root = new CSTreeNode(key)
    return true
  }
  if (this.search(childKey)) {
    return false
  }
  let node = this.search(key)
  if (node) {
    return node.insert(index, childKey)
  } else {
    return false
  }
}
CSTree.prototype.update = function (key, newKey) {
  if (this.root === null || this.search(newKey)) {
    return false
  }
  let node = this.search(key)
  if (node) {
    node.key = newKey
    return true
  } else {
    return false
  }
}
CSTree.prototype.preOrderTraverse = function (callback) {
  if (this.root === null) {
    return false
  }
  (function preOrderTraverse (node, callback) {
    callback(node.key)
    let child = node.firstChild
    while (child !== null) {
      preOrderTraverse(child, callback)
      child = child.nextSibling
    }
  })(this.root, callback)
}
CSTree.prototype.postOrderTraverse = function (callback) {
  if (this.root === null) {
    return false
  }
  (function postOrderTraverse (node, callback) {
    let child = node.firstChild
    while (child !== null) {
      postOrderTraverse(child, callback)
      child = child.nextSibling
    }
    callback(node.key)
  })(this.root, callback)
}
export default {
  data () {
    return {
      cstree: null,
      key: '',
      newKey: '',
      result: '无'
    }
  },
  mounted () {
    this.cstree = new CSTree()
    this.cstree.insert('0')
    this.paintTree()
  },
  methods: {
    paintTree () {
      let tree = this.cstree.root
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
          cxt.fillText(node.key, left + (index - 1) / totalNum * width, (level - 1) * 100 + 50)
        }
        if (level !== 1) {
          cxt.moveTo(left, (level - 2) * 100 + 50)
          cxt.lineTo(left + (index - 1) / totalNum * width, (level - 1) * 100 + 50)
          cxt.stroke()
        }
        let child = node.firstChild
        let childList = []
        while (child !== null) {
          childList.push(child)
          child = child.nextSibling
        }
        let childIndex = 1
        childList.forEach((childNode) => {
          paintNode(childNode, level + 1, left + (index - 1) / totalNum * width, width / totalNum, childIndex++, childList.length, pos)
        })
      }
      paintNode(tree, 1, 25, canvas.width, 1, 1, 0)
    },
    insertCSTree () {
      this.result = this.cstree.insert(this.key, 1, this.newKey)
      this.paintTree()
    },
    searchCSTree () {
      this.result = this.cstree.search(this.key)
    },
    updateCSTree () {
      this.result = this.cstree.update(this.key, this.newKey)
      this.paintTree()
    },
    preOrderTraverse () {
      let result = ''
      this.cstree.preOrderTraverse((value) => {
        result += value + ','
      })
      this.result = result
    },
    postOrderTraverse () {
      let result = ''
      this.cstree.postOrderTraverse((value) => {
        result += value + ','
      })
      this.result = result
    }
  }
}
</script>

<style scoped>
#CSTree {
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
.summary pre{
  text-align: left;
}
</style>
