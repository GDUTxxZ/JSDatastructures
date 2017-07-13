// 树——双亲孩子表示法
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
  this.root = null
}
PCTree.prototype.insert = function (key, pos = null) {
  if (pos > this.nodeNum - 1) {
    return false
  }
  if (this.root === null && pos === null) {
    this.nodes.push(new PCTreeNode(key))
    this.root = 0
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
  return false
}
PCTree.prototype.search = function (key) {
  if (pos > this.nodeNum - 1) {
    return false
  }
  for (let i = this.nodeNum - 1; i >= 0; i--) {
    if (this.nodes[i].key === key) {
      return this.nodes[i]
    }
  }
}
PCTree.prototype.update = function (pos, newKey) {
  if (pos > this.nodeNum - 1 || this.search(newKey)) {
    return false
  }
  this.nodes[pos].key = newKey
}
PCTree.prototype.preOrderTraverse = function (callback) {
  function traverse (pos) {
    callback(this.nodes[pos].key)
    let child = this.nodes[pos].children
    while (child !== null) {
      traverse(child.childIndex)
      child = child.nextChild
    }
  }
  traverse(0)
}
PCTree.prototype.postOrderTraverse = function (callback) {
  function traverse (pos) {
    let child = this.nodes[pos].children
    while (child !== null) {
      traverse(child.childIndex)
      child = child.nextChild
    }
    callback(this.nodes[pos].key)
  }
  traverse(0)
}