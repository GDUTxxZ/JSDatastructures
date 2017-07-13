// 邻接表
function AdjVexNode (adjvex, info = true, nextArc = null) {
  this.adjvex = adjvex // 邻接顶点在定点数组中的序号
  this.info = info // 权值
  this.nextArc = nextArc // 指向下一个邻接顶点
}
function VexNode (data, firstArc = null) {
  this.data = data // 节点值
  this.firstArc = firstArc // 邻接链表的头指针
}
function ALGraph (vexs = [], kind = 'DG') {
  this.vexs = vexs // 顶点数组
  this.kind = kind // 图的类型，DG有向图，DN有向带权图，UDG无向图，UDN无向带权图
  this.e = 0 // 边数
  for (let i = vexs.length - 1; i >= 0; i--) {
    let arc = vexs[i].firstArc
    while (arc !== null) {
      this.e++
      arc = arc.nextArc
    }
  }
  this.e /= 2
}
ALGraph.prototype.locateVex_M = function (data) { // 查找data在vexs中的序号
  for (let i = this.vexs.length - 1; i >= 0; i--) {
    if (this.vexs[i].data === data) {
      return i
    }
  }
  return false
}
ALGraph.prototype.putVex_M = function (pos, data) { // 对vexs[pos]赋值v
  if (pos >= this.vexs.length) {
    return false
  } else {
    this.vexs[pos].data = data
    return true
  }
}
ALGraph.prototype.getVex_M = function (pos) { // 取vexs[pos]的值
  if (pos >= this.vexs.length) {
    return false
  } else {
    return this.vexs[pos].data
  }
}
ALGraph.prototype.firstAdjVex_M = function (pos) { // 求图中序号为pos的顶点的邻接链表的指针
  if (pos >= this.vexs.length) {
    return false
  } else {
    return this.vexs[pos].firstArc
  }
}
ALGraph.prototype.addArc_M = function (pos1, pos2, info = true) { // 在图中增加pos1到pos2的边，若传入info则为赋权
  if (pos1 >= this.vexs.length || pos2 >= this.vexs.length || pos1 === pos2) { // pos不合法
    return false
  }
  if (this.kind !== 'DN' && this.kind !== 'UDN') {
    info = true
  } else {
    info = parseInt(info)
  }
  let posAdj = this.firstAdjVex_M(pos1) // 邻接结点指针
  if (posAdj === null) { // 若无邻接结点
    this.vexs[pos1].firstArc = new AdjVexNode(pos2, info)
  } else {
    while (posAdj.nextArc !== null) { // 循环至邻接表尾
      if (posAdj.adjvex === pos2) {
        return false
      }
      posAdj = posAdj.nextArc
    }
    posAdj.nextArc = new AdjVexNode(pos2, info)
  }
  this.e++
  if (this.kind === 'UDN' || this.kind === 'UDG') { // 无向图， 其他操作同上
    posAdj = this.firstAdjVex_M(pos2)
    if (posAdj === null) {
      this.vexs[pos2].firstArc = new AdjVexNode(pos1, info)
    } else {
      while (posAdj.nextArc !== null) {
        if (posAdj.adjvex === pos1) {
          return false
        }
        posAdj = posAdj.nextArc
      }
      posAdj.nextArc = new AdjVexNode(pos1, info)
    }
  }
  return true
}
ALGraph.prototype.removeArc_M = function (pos1, pos2) { // 移除po1到pos2的边
  if (pos1 >= this.vexs.length || pos2 >= this.vexs.length) {
    return false
  }
  let posAdj = this.firstAdjVex_M(pos1) // 邻接结点指针
  if (posAdj === null) {
    return false
  }
  if (posAdj.adjvex === pos2) {
    this.vexs[pos1].firstArc = posAdj.nextArc
  } else {
    while (posAdj.nextArc !== null && posAdj.nextArc.adjvex !== pos2) {
      posAdj = posAdj.nextArc
    }
    if (posAdj.nextArc !== null && posAdj.nextArc.adjvex === pos2) {
      posAdj.nextArc = posAdj.nextArc.nextArc
    } else {
      return false
    }
  }
  this.e--
  if (this.kind === 'UDN' || this.kind === 'UDG') { // 无向图
    posAdj = this.firstAdjVex_M(pos2) // 邻接结点指针
    if (posAdj === null) {
      return false
    }
    if (posAdj.adjvex === pos1) {
      this.vexs[pos2].firstArc = posAdj.nextArc
    } else {
      while (posAdj.nextArc !== null && posAdj.nextArc.adjvex !== pos1) {
        posAdj = posAdj.nextArc
      }
      if (posAdj.nextArc !== null && posAdj.nextArc.adjvex === pos1) {
        posAdj.nextArc = posAdj.nextArc.nextArc
      } else {
        return false
      }
    }
  }
  return true
}
ALGraph.prototype.DFSTraverse_M = function (callback) { // 深度优先遍历
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
    callback(this.vexs[pos].data)
    tag[pos] = true
    let adjNode = this.firstAdjVex_M(pos)
    while (adjNode !== null) {
      DFSTraverse.bind(this)(adjNode.adjvex)
      tag[adjNode.adjvex] = true
      adjNode = adjNode.nextArc
    }
  }
}
ALGraph.prototype.BFSTraverse_M = function (callback) { // 广度优先遍历
  let tag = new Array(this.vexs.length)
  let list = []
  for (let pos = 0; pos < this.vexs.length; pos++) {
    if (tag[pos] === undefined) {
      list.push(pos)
      tag[pos] = true
    }
    let i = list.shift()
    while (i !== undefined) {
      callback(this.vexs[i].data)
      let adjNode = this.firstAdjVex_M(i)
      while (adjNode !== null) {
        if (tag[adjNode.adjvex] === undefined) {
          list.push(adjNode.adjvex)
          tag[adjNode.adjvex] = true
        }
        adjNode = adjNode.nextArc
      }
      i = list.shift()
    }
  }
}
ALGraph.prototype.kruskal = function () { // 克鲁斯卡尔算法，构造G的最小生成树,仅用于无向连通带权图
  // 并查集,用于判断图是否产生回路
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
  MFSet.prototype.diff = function (pos1, pos2) { // 判断两个元素是否是同一集合
    if (pos1 > this.nodeNum || pos2 > this.nodeNum || this.find(pos1) !== this.find(pos2)) { // 输入不合法或不属于同一集合
      return false
    } else { // 属于同一集合
      return true
    }
  }
  MFSet.prototype.union = function (pos1, pos2) { // 合并两个元素的集合
    if (pos1 > this.nodeNum || pos2 > this.nodeNum || this.diff(pos1, pos2)) { // 输入不合法或本就属于同一集合
      return false
    } else {
      this.find(pos1).parent = pos2
    }
  }
  let newAlGraph = new ALGraph([], 'UDN')
  let nodeMFSet = new MFSet()
  let closedge = [] // 存储着边的信息
  for (let i = this.vexs.length - 1, j = 0; i >= 0; i--) { // 遍历节点
    newAlGraph.vexs.unshift(new VexNode(this.vexs[i].data)) // 初始化新图
    nodeMFSet.setRoot(j++)
    let arc = this.firstAdjVex_M(i) // 遍历该节点的所有邻接边
    while (arc !== null) {
      if (closedge.every((item) => { // 若边已在边数组中，返回false
        if (item.i !== arc.adjvex || item.j !== i) {
          return true
        } else {
          return false
        }
      })) {
        closedge.push({
          i: i,
          j: arc.adjvex,
          info: arc.info
        })
      }
      arc = arc.nextArc
    }
  }
  closedge.sort((a, b) => { return b.info - a.info }) // 降序排列
  for (let i = this.e - 1; i >= 0; i--) {
    console.log(nodeMFSet)
    console.log('pos1: ' + closedge[i].i)
    console.log('pos2: ' + closedge[i].j)
    if (!nodeMFSet.diff(closedge[i].i, closedge[i].j)) {
      console.log('找到可加入的边')
      console.log(newAlGraph.addArc_M(closedge[i].i, closedge[i].j, closedge[i].info))
      nodeMFSet.union(closedge[i].i, closedge[i].j)
    }
  }
  return newAlGraph
}
ALGraph.prototype.dijkstra = function (pos) { // 迪杰斯特拉算法，求从pos出发到其他顶点的路径
  let dist = new Array(this.vexs.length) // 存放当前最短路径的信息
  let tag = new Array(this.vexs.length) // 标记顶点是否加入
  dist[pos] = {
    lowcost: 0,
    prev: null
  }
  let arc = this.vexs[pos].firstArc
  while (arc !== null) { // 从源点引出的路径的信息
    dist[arc.adjvex] = {
      lowcost: arc.info,
      prev: pos
    }
    arc = arc.nextArc
  }
  tag[pos] = true // 放入源点
  for (let i = this.vexs.length - 2; i >= 0; i--) {
    let min = null // 最小权值
    let k = null // 顶点序号
    for (let j = this.vexs.length - 1; j >= 0; j--) {
      if (dist[j] !== undefined && tag[j] === undefined && (min === null || min > dist[j].lowcost)) {
        min = dist[j].lowcost
        k = j
      }
    }
    if (k !== null) {
      tag[k] = true // 放入最小的顶点
      arc = this.vexs[k].firstArc
      while (arc !== null) { // 从该顶点引出的路径的信息
        let j = arc.adjvex
        if (tag[j] === undefined && (dist[j] === undefined || (dist[k].lowcost + arc.info) < dist[j].lowcost)) {
          dist[j] = {
            lowcost: dist[k].lowcost + arc.info,
            prev: k
          }
        }
        arc = arc.nextArc
      }
    }
  }
  return dist
}
ALGraph.prototype.toplogicalSort = function () { // 拓补排序，求有向图的拓补排序，若失败返回false
  if (this.kind !== 'DG' && this.kind !== 'DN') {
    return false
  }
  let toplogical = [] // 存放已排序好的部分
  let nodeDegree = [] // 存放每个顶点的出度数
  for (let i = this.vexs.length - 1; i >= 0; i--) {
    nodeDegree.push(0) // 初始化入度数序列
  }
  for (let i = this.vexs.length - 1; i >= 0; i--) { // 记录所有点的入度
    let arc = this.vexs[i].firstArc
    while (arc !== null) {
      nodeDegree[arc.adjvex]++
      arc = arc.nextArc
    }
  }
  for (let i = this.vexs.length - 1; i >= 0; i--) { // 依次写入排序
    for (let j = this.vexs.length - 1; j >= 0; j--) { // 找出入度为0的点
      if (nodeDegree[j] === 0) {
        nodeDegree[j]--
        toplogical.push({
          data: this.vexs[j].data,
          pos: j
        })
        let arc = this.vexs[j].firstArc
        while (arc !== null) {
          nodeDegree[arc.adjvex]--
          arc = arc.nextArc
        }
        break
      }
    }
  }
  if (toplogical.length !== this.vexs.length) { // 图有环或者有其他不合规范的情况
    return false
  } else {
    return toplogical
  }
}
ALGraph.prototype.criticalPath = function () { // 关键路径
  if (this.kind !== 'DG' && this.kind !== 'DN') {
    return false
  }
  let toplogical = [] // 存放已排序好的部分
  let nodeDegree = [] // 存放每个顶点的出度数
  let ve = [] // 存放每个顶点的最早发生时间
  let vl = [] // 存放每个顶点的最迟发生时间
  let A = [] // 存放结果
  for (let i = this.vexs.length - 1; i >= 0; i--) {
    nodeDegree.push(0) // 初始化入度数序列
    ve.push(0)
  }
  for (let i = this.vexs.length - 1; i >= 0; i--) { // 记录所有点的入度
    let arc = this.vexs[i].firstArc
    while (arc !== null) {
      nodeDegree[arc.adjvex]++
      arc = arc.nextArc
    }
  }
  for (let i = this.vexs.length - 1; i >= 0; i--) { // 依次写入排序
    for (let j = this.vexs.length - 1; j >= 0; j--) { // 找出入度为0的点
      if (nodeDegree[j] === 0) {
        nodeDegree[j]--
        toplogical.push({
          data: this.vexs[j].data,
          pos: j
        })
        let arc = this.vexs[j].firstArc
        while (arc !== null) {
          ve[arc.adjvex] = (ve[j] + arc.info) > ve[arc.adjvex] ? (ve[j] + arc.info) : ve[arc.adjvex] // 更新ve
          nodeDegree[arc.adjvex]--
          arc = arc.nextArc
        }
        break
      }
    }
  }
  for (let i = this.vexs.length - 1, j = ve[this.vexs.length - 1]; i >= 0; i--) { // 初始化vl序列
    vl.push(j)
  }
  for (let i = this.vexs.length - 2; i >= 0; i--) {
    let arc = this.vexs[i].firstArc
    while (arc !== null) {
      vl[i] = (ve[arc.adjvex] - arc.info) < vl[i] ? (ve[arc.adjvex] - arc.info) : vl[i] // 更新vl
      arc = arc.nextArc
    }
  }
  for (let i = this.vexs.length - 1; i >= 0; i--) { // 计算av, al
    let ae // 活动的最早开始时间
    let al // 活动的最迟开始时间
    let arc = this.vexs[i].firstArc
    while (arc !== null) {
      ae = ve[i]
      al = vl[arc.adjvex] - arc.info
      if (ae === al) {
        A.unshift({
          v1: this.vexs[i].data,
          v2: this.vexs[arc.adjvex].data,
          info: arc.info,
          ae: ae,
          al: al,
          le: al - ae
        })
      }
      arc = arc.nextArc
    }
  }
  if (toplogical.length !== this.vexs.length) { // 图有环或者有其他不合规范的情况
    return false
  } else {
    return A
  }
}