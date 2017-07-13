// 孩子兄弟表示法
function CSTreeNode (key, firstChild = null, nextSibling = null) {
  this.key = key
  this.firstChild = firstChild
  this.nextSibling = nextSibling
}
CSTreeNode.prototype.insert = function (index, key) { // 把key插入，作为该节点子树第index个子树
  if (index === 1) {
    if (this.firstChild) {
      this.firstChild = new CSTreeNode(key, null, this.firstChild.nextSibling)
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
CSTree.search = function (key) {
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
CSTree.insert = function (key, index, childKey) {
  if (this.root === null) {
    this.root = new CSTreeNode(key)
    return true
  }
  let node = this.search(key)
  if (node) {
    return node.insert(index, childKey)
  } else {
    return false
  }
}
CSTree.update = function (key, newKey) {
  if (this.root === null) {
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
    if (node.firstChild !== null) {
      preOrderTraverse(node.firstChild, callback)
    }
    let sibling = node.nextSibling
    while (sibling !== null) {
      preOrderTraverse(sibling, callback)
      sibling = sibling.nextSibling
    }
  })(this.root, callback)
}
CSTree.prototype.postOrderTraverse = function (callback) {
  if (this.root === null) {
    return false
  }
  (function (node, callback) {
    if (node.firstChild !== null) {
      postOrderTraverse(node.firstChild, callback)
    }
    let sibling = node.nextSibling
    while (sibling !== null) {
      postOrderTraverse(sibling, callback)
      sibling = sibling.nextSibling
    }
    callback(node.key)
  })(this.root, callback)
}