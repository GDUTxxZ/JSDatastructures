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