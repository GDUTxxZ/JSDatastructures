// 邻接数组
function MGraph (vexs = [], kind = 'DG', arcs = []) {
  this.vexs = vexs // 定点数组
  this.arcs = arcs // 关系数组
  if (this.arcs.length !== this.vexs.length) { // 不合法的arcs
    this.arcs = new Array(this.vexs.length)
    for (let i = this.vexs.length - 1; i >= 0; i--) {
      this.arcs[i] = []
      for (let j = this.vexs.length - 1; j >= 0; j--) {
        this.arcs[i].push(null)
      }
    }
  } else {
    for (let i = this.vexs.length - 1; i >= 0; i--) {
      if (this.arcs[i].length !== this.vexs.length) {
        return new MGraph(vexs, kind)
      }
    }
  }
  this.e = 0 // 边数
  for (let i = this.vexs.length - 1; i >= 0; i--) {
    for (let j = this.vexs.length - 1; j >= 0; j--) {
      if (this.arcs[i][j] !== null) {
        this.e++
      }
    }
  }
  if (kind === 'UDG' || kind === 'UDN') {
    this.e /= 2
  }
  this.kind = kind // 图的类型，DG有向图，DN有向带权图，UDG无向图，UDN无向带权图
}
MGraph.prototype.locateVex_M = function (v) { // 查找v在vexs中的序号
  for (let i = this.vexs.length - 1; i >= 0; i--) {
    if (this.vexs[i] === v) {
      return i
    }
  }
  return false
}
MGraph.prototype.putVex_M = function (pos, v) { // 对vexs[pos]赋值v
  if (pos >= this.vexs.length) {
    return false
  } else {
    this.vexs[pos] = v
    return true
  }
}
MGraph.prototype.getVex_M = function (pos) { // 取vexs[pos]的值
  if (pos >= this.vexs.length) {
    return false
  } else {
    return this.vexs[pos]
  }
}
MGraph.prototype.firstAdjVex_M = function (pos) { // 求图中序号为pos的顶点的第一个邻接顶点的序号
  for (let i = 0; i < this.vexs.length; i++) {
    if (this.arcs[pos][i] !== null) return i
  }
  return false
}
MGraph.prototype.nextAdjVex_M = function (pos1, pos2) { // pos2是pos1的邻接顶点，求图中pos1相对于pos2的下一个邻接顶点的位序
  for (let i = pos2 + 1; i < this.vexs.length; i++) {
    if (this.arcs[pos1][i] !== null) return i
  }
  return false
}
MGraph.prototype.addArc_M = function (pos1, pos2, info = true) { // 在图中增加pos1到pos2的边，若传入info则为赋权
  if (pos1 >= this.vexs.length || pos2 >= this.vexs.length || this.arcs[pos1][pos2] !== null) {
    return false
  }
  if (this.kind !== 'DN' && this.kind !== 'UDN') {
    info = true
  }
  if (this.kind === 'UDN' || this.kind === 'UDG') {
    this.arcs[pos2][pos1] = info
    this.e++
  }
  this.arcs[pos1][pos2] = info
  this.e++
  return true
}
MGraph.prototype.removeArc_M = function (pos1, pos2) { // 移除po1到pos2的边
  if (pos1 >= this.vexs.length || pos2 >= this.vexs.length || this.arcs[pos1][pos2] === null) {
    return false
  }
  if (this.kind === 'UDN' || this.kind === 'UDG') {
    this.arcs[pos1][pos2] = null
    this.e--
  }
  this.arcs[pos1][pos2] = null
  this.e--
  return true
}
MGraph.prototype.DFSTraverse_M = function (callback) { // 深度优先遍历
  let tag = new Array(this.vexs.length)
  for (let pos = 0; pos < this.vexs.length; pos++) {
    if (tag[pos] === undefined) {
      DFSTraverse.bind(this)(pos)
    }
  }
  function DFSTraverse (pos) {
    if (tag[pos]) {
      return
    }
    callback(this.vexs[pos])
    tag[pos] = true
    let currentPos = this.firstAdjVex_M(pos)
    while (currentPos) {
      DFSTraverse.bind(this)(currentPos)
      tag[currentPos] = true
      currentPos = this.nextAdjVex_M(pos, currentPos)
    }
  }
}
MGraph.prototype.BFSTraverse_M = function (callback) { // 广度优先遍历
  let tag = new Array(this.vexs.length)
  let list = []
  for (let pos = 0; pos < this.vexs.length; pos++) {
    if (tag[pos] === undefined) {
      list.push(pos)
      tag[pos] = true
    }
    let i = list.shift()
    while (i !== undefined) {
      callback(this.vexs[i])
      for (let j = 0; j < this.vexs.length; j++) {
        if (this.arcs[i][j] !== null && tag[j] === undefined) {
          tag[j] = true
          list.push(j)
        }
      }
      i = list.shift()
    }
  }
}
MGraph.prototype.prim = function (pos) { // 普里姆算法，从pos出发构造G的最小生成树,仅用于无向连通带权图
  if (this.kind !== 'UDN') { // 若非无向带权图，则失败
    return false
  }
  let newMGraph = new MGraph(this.vexs, 'UDN')
  let posList = [pos] // 已加入树的节点
  let flag = true
  while (flag) {
    let min = null
    for (let i = posList.length - 1; i >= 0; i--) {
      for (let j = this.vexs.length - 1; j >= 0; j--) { // 找出最小边
        if (this.arcs[posList[i]][j] !== null && posList.every((item) => { return item !== j })) {
          if (min === null || parseInt(min.info) >= parseInt(this.arcs[posList[i]][j])) {
            min = {
              i: posList[i],
              j: j,
              info: parseInt(this.arcs[posList[i]][j])
            }
          }
        }
      }
    }
    if (min !== null) {
      newMGraph.addArc_M(min.i, min.j, min.info)
      posList.push(min.j)
      console.log(posList)
    } else {
      console.log('min : ' + min)
      flag = false
    }
  }
  return newMGraph
}