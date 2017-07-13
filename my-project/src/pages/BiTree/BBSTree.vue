<template>
  <div id="BBSTree">
    <h1></h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <canvas width="600" height="400" id="canvas-tree"></canvas>
    </div>
    <div class="show-data">
      <h2>结果</h2>
      {{result}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <div class="operate-data-item">
        <button @click.stop.prevent="insertBBSTree">插入</button>
        <input type="text" v-model="insertData" name="insertData" placeholder="数据">
        <span class="oprate-data-aux"><=数据（数字）</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="removeBBSTree">删除</button>
        <input type="text" v-model="deleteKey" name="deleteKey" placeholder="关键字">
        <span class="oprate-data-aux"><=关键字</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="searchBBSTree">查找</button>
        <input type="text" v-model="searchKey" name="searchKey" placeholder="关键字">
        <span class="oprate-data-aux"><=关键字</span>
      </div>
    </div>
    <div class="summary">
      <h2>总结：</h2>
      <h3>二叉平衡树结构：</h3>
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
function BBSTree () {
  function Node (key) {
    this.key = key
    this.left = null
    this.right = null
  }
  this.root = null
  this.getRoot = function () {
    return this.root
  }
  function heightNode (node) {
    if (node === null) {
      return -1
    } else {
      return Math.max(heightNode(node.left), heightNode(node.right)) + 1
    }
  }
  function rotationLL (node) {
    var tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }
  function rotationRR (node) {
    var tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }
  function rotationLR (node) {
    node.left = rotationRR(node.left)
    return rotationLL(node)
  }
  function rotationRL (node) {
    node.right = rotationLL(node.right)
    return rotationRR(node)
  }
  function insertNode (node, element) {
    if (node === null) {
      node = new Node(element)
    } else if (element < node.key) {
      node.left = insertNode(node.left, element)
      if (node.left !== null) {
        if ((heightNode(node.left) - heightNode(node.right)) > 1) {
          if (element < node.left.key) {
            node = rotationLL(node)
          } else {
            node = rotationLR(node)
          }
        }
      }
    } else if (element > node.key) {
      node.right = insertNode(node.right, element)
      if (node.right !== null) {
        if ((heightNode(node.right) - heightNode(node.left)) > 1) {
          if (element > node.right.key) {
            node = rotationRR(node)
          } else {
            node = rotationRL(node)
          }
        }
      }
    }
    return node
  }
  this.insert = function (element) {
    this.root = insertNode(this.root, element)
  }
  var parentNode
  var nodeToBeDeleted
  function removeNode (node, element) {
    if (node === null) {
      return null
    }
    parentNode = node
    if (element < node.key) {
      node.left = removeNode(node.left, element)
    } else {
      nodeToBeDeleted = node
      node.right = removeNode(node.right, element)
    }
    if (node === parentNode) { // remove node
      if (nodeToBeDeleted !== null && element === nodeToBeDeleted.key) {
        if (nodeToBeDeleted === parentNode) {
          node = node.left
        } else {
          var tmp = nodeToBeDeleted.key
          nodeToBeDeleted.key = parentNode.key
          parentNode.key = tmp
          node = node.right
        }
      }
    } else { // do balancing
      if (node.left === undefined) node.left = null
      if (node.right === undefined) node.right = null

      if ((heightNode(node.left) - heightNode(node.right)) === 2) {
        if (element < node.left.key) {
          node = rotationLR(node)
        } else {
          node = rotationLL(node)
        }
      }
      if ((heightNode(node.right) - heightNode(node.left)) === 2) {
        if (element > node.right.key) {
          node = rotationRL(node)
        } else {
          node = rotationRR(node)
        }
      }
    }
    return node
  }
  this.remove = function (element) {
    parentNode = null
    nodeToBeDeleted = null
    this.root = removeNode(this.root, element)
  }
  this.search = function (key) {
    function searchKey (node, key) {
      if (node === null) {
        return false
      }
      if (node.key === key) {
        return node
      } else {
        let leftResult = searchKey(node.left, key)
        let rightResult = searchKey(node.right, key)
        if (leftResult !== false) {
          return leftResult
        }
        if (rightResult !== false) {
          return rightResult
        }
        return false
      }
    }
    return searchKey(this.root, key)
  }
}
export default {
  data () {
    return {
      bbstree: null,
      insertData: '',
      deleteKey: '',
      searchKey: '',
      result: '无'
    }
  },
  mounted () {
    this.bbstree = new BBSTree()
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
        if (tree.key !== null && tree.key !== undefined) {
          cxt.fillText(tree.key, 600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50)
        }
        if (level !== 1) {
          cxt.moveTo(600 / (Math.pow(2, level - 2) + 1) * parentIndex, (level - 2) * 100 + 50)
          cxt.lineTo(600 / (Math.pow(2, level - 1) + 1) * index, (level - 1) * 100 + 50)
          cxt.stroke()
        }
        if (tree.left) paintNode(tree.left, level + 1, index * 2 - 1)
        if (tree.right) paintNode(tree.right, level + 1, index * 2)
      }
      paintNode(this.bbstree.getRoot(), 1, 1)
    },
    insertBBSTree () {
      this.result = this.bbstree.insert(parseInt(this.insertData))
      this.paintTree()
    },
    removeBBSTree () {
      this.result = this.bbstree.remove(parseInt(this.deleteKey))
      this.paintTree()
    },
    searchBBSTree () {
      this.result = this.bbstree.search(parseInt(this.searchKey))
    }
  }
}
</script>

<style scoped>
#BBSTree {
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
