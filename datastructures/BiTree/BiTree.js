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