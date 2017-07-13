// 并查集
function MFSetNode (key, parent = null) {
  this.key = key
  this.parent = parent
}
function MFSet () {
  this.nodes = []
  this.nodeNum = 0
}
MFSet.prototype.setRoot = function (key) { // 插入一个代表元
  if (this.search(key)) {
    return false
  } else {
    this.nodes.push(new MFSetNode(key))
    this.nodeNum++
    return true
  }
}
MFSet.prototype.insert = function (key, pos) { // 插入一个以pos为父节点的子节点
  if (this.search(key) || pos > this.nodeNum - 1) {
    return false
  } else {
    this.nodes.push(new MFSetNode(key, pos))
    this.nodeNum++
    return true
  }
}
MFSet.prototype.search = function (key) { // 搜索值为Key的节点
  for (let i = this.nodeNum - 1; i >= 0; i--) {
    if (this.nodes[i].key === key) {
      return i
    }
  }
  return false
}
MFSet.prototype.find = function (pos) { // 找到pos所属的集合的代表元(路径压缩法)
  if (pos > this.nodeNum) {
    return false
  } else {
    let node = this.nodes[pos]
    let nodePos = pos
    let nodeList = []
    while (node.parent !== null) {
      nodeList.push(node)
      nodePos = node.parent
      node = this.nodes[nodePos]
    }
    if (nodeList.length > 0) {
      for (let i = nodeList.length - 1; i >= 0; i--) {
        nodeList[i].parent = nodePos
      }
    }
    return node
  }
}
MFSet.prototype.diff = function (pos1, pos2) {
  if (pos1 > this.nodeNum || pos2 > this.nodeNum || this.find(pos1) !== this.find(pos2)) { // 输入不合法或不属于同一集合
    return false
  } else { // 属于同一集合
    return true
  }
}
MFSet.prototype.union = function (pos1, pos2) {
  if (pos1 > this.nodeNum || pos2 > this.nodeNum || this.diff(pos1, pos2)) { // 输入不合法或本就属于同一集合
    return false
  } else {
    this.find(pos1).parent = pos2
  }
}