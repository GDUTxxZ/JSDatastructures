// 一颗m阶B树，或为空树，或为满足以下特性的m叉树：
//   1.树中每个节点最多含有m颗子树
//   2.若根节点是非终端节点，则至少有两颗子树
//   3.除根节点外的所有非终端节点至少有Math.ceil(m/2)颗子树
//   4.每个非终端节点中包含信息：（n, A0, K1, A1, K2, A2, ......, Kn, An）其中：
//     1）K为关键字
//     2）A为子树指针
//     3）关键字个数n满足 m/2-1 <= n <= m-1
function BTreeNode (keyList = [], record = [], parent = null) {
  this.keyList = keyList // 关键字列表
  this.keyNum = keyList.length // 关键字数量
  this.parent = parent // 父指针
  this.record = record // 记录指针列表
  this.children = [] // 子节点列表
  for (let i = this.keyNum; i >= 0; i--) {
    this.children.push(null)
  }
}
function BTree (m = 2, newRoot = null) {
  this.m = m // B树的阶
  this.root = newRoot // 分裂出新树时使用
}
BTree.prototype.search = function (key) { // 在B树中查找该关键字的记录，若树为空返回false，否则返回结果对象
  if (this.root === null) {
    return false
  } else {
    return this.root.search(key)
  }
}
// 该方法返回一个结果对象：
// {
//   tag: true / false  true表示返回的是查找到的记录，false表示返回的是最终空的结点
//   node: 返回查询最后的节点
//   pos: 表示返回pos序号的值
// }
BTreeNode.prototype.search = function (key) {
  for (let i = this.keyNum - 1; i >= 0; i--) {
    if (this.keyList[i] === key) { // 查找到该关键字
      return {
        tag: true,
        node: this,
        pos: i
      }
    } else if (this.keyList[i] < key) { // 查找不到该关键字
      if (this.children[i] !== null) {
        return this.children[i].search(key)
      } else {
        return {
          tag: false,
          node: this,
          pos: i
        }
      }
    }
  }
  return {
    tag: false,
    node: this,
    pos: this.keyNum
  }
}
BTree.prototype.insertNode = function (node, pos, key, record) { // 在B树中的node节点的pos处插入一个新的记录
  node.keyList.splice(pos, 0, key)
  node.record.splice(pos, 0, record)
  node.children.splice(pos, 0, null)
  node.keyNum++
  if (node.keyNum >= this.m) { // 关键字数量过多，需要分裂
    let splitPos = Math.floor(node.keyNum / 2)
    let splitKey = node.keyList.splice(splitPos, 1)[0]
    let splitRecord = node.record.splice(splitPos, 1)[0]
    let splitChild = new BTreeNode(node.keyList.splice(splitPos), node.record.splice(splitPos), parent)
    if (node.parent) {
      let parent = node.parent
      let insertPos = 0
      while (insertPos <= parent.keyNum - 1 && parent.keyList[insertPos] < splitKey) {
        insertPos++
      }
      BTree.children.splice(insertPos, 0, splitChild)
      this.insertNode(parent, insertPos, splitKey, splitRecord)
    }
  }
}
BTree.prototype.insert = function (key, record) {
  if (this.root === null) {
    this.root = new BTreeNode([key], [record])
    return true
  }
  let result = this.root.search(key)
  if (result.teg) { // 如果已有该关键字
    return false
  } else {
    this.insertNode(result.node, result.pos, key, record)
  }
}
BTree.prototype.deleteNode = function (node, pos) {
  if (node.children[pos] === null) { // 该节点为最下层非终端节点
    if (node.keyNum >= Math.ceil(this.m / 2)) { // 删除后仍满足B树的定义
      node.keyList.splice(pos, 1)
      node.children.splice(pos, 1)
      node.record.splice(pos, 1)
    } else {
      let parent = node.parent // 父节点
      let _pos = parent.keyNum // 记录该节点在父节点子列表的位置
      while (parent.children[_pos] !== node) {
        _pos--
      }
      if (parent.children[_pos + 1] && parent.children[_pos + 1].keyNum >= Math.ceil(this.m / 2)) {
        // 将原来的记录清除
        node.keyList.splice(pos, 1)
        node.record.splice(pos, 1)
        // 将父节点的记录移入
        node.keyList.push(parent.keyList.splice(_pos, 1))
        node.record.push(parent.record.splice(_pos, 1))
        // 将兄弟节点的记录移入父节点
        parent.keyList.splice(_pos, 0, parent.children[_pos + 1].keyList.splice(0, 1))
        parent.record.splice(_pos, 0, parent.children[_pos + 1].record.splice(0, 1))
        parent.children[_pos + 1].children.pop()
        parent.children[_pos + 1].keyNum--
      } else if (parent.children[_pos - 1] && parent.children[_pos - 1].keyNum >= Math.ceil(this.m / 2)) {
        // 将原来的记录清除
        node.keyList.splice(pos, 1)
        node.record.splice(pos, 1)
        // 将父节点的记录移入
        node.keyList.unshift(parent.keyList.splice(_pos - 1, 1))
        node.record.unshift(parent.record.splice(_pos - 1, 1))
        // 将兄弟节点的记录移入父节点
        parent.keyList.splice(_pos, 0, parent.children[_pos - 1].keyList.splice(parent.children[_pos - 1].keyNum - 1, 1))
        parent.record.splice(_pos, 0, parent.children[_pos - 1].record.splice(parent.children[_pos - 1].keyNum - 1, 1))
        parent.children[_pos -1].children.pop()
        parent.children[_pos -1].keyNum--
      } else {
        // 暂未完成
      }
    }
  }
}
BTree.prototype.delete = function (key) {
  if (this.root === null) {
    return false
  }
  let result = this.root.search(key)
  if (result.tag) {
    this.deleteNode(result.node, result.pos)
  } else {
    return false
  }
}