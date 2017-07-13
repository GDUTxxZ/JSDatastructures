// 二叉平衡树
// 这一大段不全是我自己实现的
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