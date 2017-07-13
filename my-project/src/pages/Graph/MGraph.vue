<template>
  <div id="MGraph">
    <h1>邻接数组</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <canvas width="500" height="500" id="canvas-mgraph"></canvas>
    </div>
    <div class="show-data">
      <h2>结果：</h2>
      {{result}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <div class="operate-data-item">
        <input type="text" v-model="vexsNumber" name="vexsNumber" placeholder="顶点数">
        <span class="oprate-data-aux"><=顶点数量</span>
        <input type="text" v-model="graphKind" name="graphKind" placeholder="图的类型">
        <span class="oprate-data-aux">DG有向图，DN有向带权图，UDG无向图，UDN无向带权图</span>
        <button @click.stop.prevent="createMGraph">生成图</button>
      </div>
      <div class="operate-data-item">
        <input type="text" v-model="pos1" name="pos1" placeholder="位置1">
        <span class="oprate-data-aux"><=位置1</span>
        <input type="text" v-model="pos2" name="pos2" placeholder="位置2">
        <span class="oprate-data-aux"><=位置2</span>
        <input type="text" v-model="info" name="info" placeholder="权值">
        <span class="oprate-data-aux"><=赋权</span>
        <button @click.stop.prevent="addArc_M">增加边</button>
        <button @click.stop.prevent="removeArc_M">删除边</button>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="DFSTraverse_M">深度优先遍历</button>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="BFSTraverse_M">广度优先遍历</button>
      </div>
      <div class="operate-data-item">
        <input type="text" v-model="pos3" name="pos3" placeholder="生成树的起点">
        <span class="oprate-data-aux"><=生成树的起点（序号）</span>
        <button @click.stop.prevent="prim">普里姆算法(仅UDN可用)</button>
      </div>
    </div>
    <div class="summary">
      <h2>总结：图——邻接数组</h2>
      <h3>邻接数组结构：</h3>
      <pre>
        {
          vexs: Array // 节点数组
          kind: String // 字符串，表示图的类型，DG有向图，DN有向带权图，UDG无向图，UDN无向带权图
          e: Number // 边的数量
          arcs: Array // 边数组， null 表示无边
        }
      </pre>
      <h3>接口：</h3>
      <pre>
        locateVex_M(v) // 查找v在vexs中的序号
        putVex_M(pos, v) // 对vexs[pos]赋值v
        getVex_M(pos) // 取vexs[pos]的值
        firstAdjVex_M(pos) // 求图中序号为pos的顶点的第一个邻接顶点的序号
        nextAdjVex_M(pos1, pos2) // pos2是pos1的邻接顶点，求图中pos1相对于pos2的下一个邻接顶点的位序
        addArc_M(pos1, pos2, info) // 在图中增加pos1到pos2的边，若传入info则为赋权
        removeArc_M(pos1, pos2) // 移除po1到pos2的边
        DFSTraverse_M(callback) // 深度优先遍历
        BFSTraverse_M(callback) // 广度优先遍历
        prim(pos) // 普里姆算法，从pos出发构造G的最小生成树,仅用于无向连通带权图
      </pre>
    </div>
  </div>
</template>

<script>
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
export default {
  data () {
    return {
      mgraph: null,
      vexsNumber: 0,
      graphKind: 'UDN',
      pos1: 0,
      pos2: 0,
      pos3: 0,
      info: 0,
      result: '无'
    }
  },
  methods: {
    paintMgraph () {
      let canvas = document.getElementById('canvas-mgraph')
      let cxt = canvas.getContext('2d')
      canvas.width = canvas.width
      canvas.height = canvas.height
      cxt.scale(0.8, 0.8)
      cxt.translate(canvas.width * 0.1, canvas.height * 0.1)
      let data = this.mgraph
      let num = data.vexs.length
      let angle = Math.PI * 2 / num
      for (let i = 0; i < num; i++) {
        cxt.moveTo(canvas.width / 2 * (1 + Math.sin(angle * i)), canvas.height / 2 * (1 + Math.cos(angle * i)))
        cxt.fillStyle = 'red'
        cxt.strokeStyle = 'red'
        cxt.beginPath()
        cxt.arc(canvas.width / 2 * (1 + Math.sin(angle * i)), canvas.height / 2 * (1 + Math.cos(angle * i)), canvas.width / 15, 0, Math.PI * 2, true)
        cxt.closePath()
        cxt.stroke()
        cxt.font = '30px serif'
        cxt.textAlign = 'center'
        cxt.fillText(data.vexs[i], canvas.width / 2 * (1 + Math.sin(angle * i)), canvas.height / 2 * (1 + Math.cos(angle * i)))
      }
      function drawArrow (x1, y1, x2, y2, text) {
        let arcAngle = Math.atan2(Math.round(y1 - y2), Math.round(x1 - x2))
        if (arcAngle >= 0) {
          cxt.translate(10, 10)
        } else {
          cxt.translate(-10, -10)
        }
        console.log('x1: ' + Math.round(x2 - x1) + ', y1: ' + Math.round(y2 - y1) + ', arcAngle: ' + arcAngle / Math.PI * 180 + '度')
        let leftLineAngle = arcAngle + Math.PI / 18
        let rightLineAngle = arcAngle - Math.PI / 18
        cxt.beginPath()
        cxt.arc(x2, y2, 30, leftLineAngle, rightLineAngle, true)
        cxt.lineTo(x2, y2)
        cxt.fill()
        cxt.closePath()
        cxt.moveTo(x1, y1)
        cxt.lineTo(x2, y2)
        cxt.stroke()
        cxt.fillText(text, (x1 + x2) / 2, (y1 + y2) / 2)
        if (arcAngle >= 0) {
          cxt.translate(-10, -10)
        } else {
          cxt.translate(10, 10)
        }
      }
      if (data.kind === 'DG' || data.kind === 'DN') { // 有向图
        for (let i = 0; i < num; i++) {
          for (let j = 0; j < num; j++) {
            if (data.arcs[i][j] !== null) {
              drawArrow(canvas.width / 2 * (1 + Math.sin(angle * i)), canvas.height / 2 * (1 + Math.cos(angle * i)), canvas.width / 2 * (1 + Math.sin(angle * j)), canvas.height / 2 * (1 + Math.cos(angle * j)), data.arcs[i][j])
            }
          }
        }
      } else {
        let tag = new Array(num)
        for (let i = 0; i < num; i++) {
          tag[i] = new Array(num)
        }
        for (let i = 0; i < num; i++) {
          for (let j = 0; j < num; j++) {
            if (data.arcs[i][j] !== null && tag[i][j] !== true) {
              cxt.moveTo(canvas.width / 2 * (1 + Math.sin(angle * i)), canvas.height / 2 * (1 + Math.cos(angle * i)))
              cxt.lineTo(canvas.width / 2 * (1 + Math.sin(angle * j)), canvas.height / 2 * (1 + Math.cos(angle * j)))
              cxt.stroke()
              cxt.fillText(data.arcs[i][j], (canvas.width / 2 * (1 + Math.sin(angle * i)) + canvas.width / 2 * (1 + Math.sin(angle * j))) / 2, (canvas.height / 2 * (1 + Math.cos(angle * i)) + canvas.height / 2 * (1 + Math.cos(angle * j))) / 2)
              tag[i][j] = true
              tag[j][i] = true
            }
          }
        }
      }
    },
    createMGraph () {
      let vexs = []
      for (let i = this.vexsNumber - 1; i >= 0; i--) {
        vexs.unshift(i)
      }
      this.mgraph = new MGraph(vexs, this.graphKind)
      this.result = '无'
      this.paintMgraph()
    },
    addArc_M () {
      this.result = this.mgraph.addArc_M(parseInt(this.pos1), parseInt(this.pos2), this.info)
      this.paintMgraph()
    },
    removeArc_M () {
      this.result = this.mgraph.removeArc_M(parseInt(this.pos1), parseInt(this.pos2), this.info)
      this.paintMgraph()
    },
    DFSTraverse_M () {
      let result = ''
      this.mgraph.DFSTraverse_M((val) => { result += val + ',' })
      this.result = result.slice(0, result.length - 1)
    },
    BFSTraverse_M () {
      let result = ''
      this.mgraph.BFSTraverse_M((val) => { result += val + ',' })
      this.result = result.slice(0, result.length - 1)
    },
    prim () {
      this.mgraph = this.mgraph.prim(parseInt(this.pos3))
      console.log(this.mgraph)
      this.paintMgraph()
    }
  }
}
</script>

<style scoped>
#MGraph {
  font-size: 20px;
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
  width: 140px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
}
.operate-data input {
  width: 100px;
  height: 37px;
  padding: 0;
  text-align: center;
}
#MGraph .oprate-data-aux {
  font-size: 15px;
}
.summary {
  background-color: #afe;
}
.summary pre {
  text-align: left;
}
</style>
