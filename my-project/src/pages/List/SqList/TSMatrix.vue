<template>
  <div id="TSMatrix">
    <h1>稀疏矩阵</h1>
    <div class="show-view">
      <h2>结果显示</h2>
      {{result}}
    </div>
    <div class="show-data">
      <h2>数据显示</h2>
      {{TSMatrix_1}}
      <hr>
      {{TSMatrix_2}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="createTSMatrix">创建</button>
      <button @click.stop.prevent="addTSMatrix">加</button>
      <button @click.stop.prevent="divTSMatrix">减</button>
      <button @click.stop.prevent="mulTSMatrix">乘</button>
      <button @click.stop.prevent="transposeTSMatrix">转置</button>
    </div>
    <div class="summary">
      <h2>总结</h2>
      <p>
        <h3>稀疏矩阵结构：</h3>
        <pre>
        {
          mu: Number, // 行数
          nu: Number, // 列数
          tu: Number, // 非零元个数
          data: Array // 三元表，每一单元为一个三元组
        }
        </pre>
        <h3>三元组结构为:</h3>
        <pre>
          [行数, 列数, 非零元的值]
        </pre>
        <h3>接口:</h3>
        <pre>
          copy () // 返回深复制的一个稀疏矩阵
          add (otherTSMatrix) // 返回两个矩阵的和
          div (otherTSMatrix) // 返回两个矩阵的差
          mul (otherTSMatrix) // 返回两个矩阵的乘积
          transpose () // 返回转置的矩阵
        </pre>
        <h3>转置：若简单交换A的行和列，则得到的是按列有限的B，不利于矩阵的常见运算</h3>
        <h4>按列转置：对A中的每一列，从头到尾扫面三元表。找出列号相同的三元组，将其行列序号交换后存入B中</h4>
        <h4>js转置：js的Array内置对象有sort方法，因此可以直接交换A的行列序号，再用sort方法排序</h4>
        <h5>实验证明，速度方面：js方法>快速转置>按列转置</h5>
      </p>
    </div>
  </div>
</template>

<script>
function TSMatrix (mu = 0, nu = 0, tu = 0, data = []) {
  this.mu = mu
  this.nu = nu
  this.tu = tu
  this.data = data
}
TSMatrix.prototype.copy = function () {
  var newTSMatrix = new TSMatrix(this.mu, this.nu, this.tu)
  for (var i = this.tu - 1; i >= 0; i--) {
    newTSMatrix.data[i] = []
    newTSMatrix.data[i][0] = this.data[i][0]
    newTSMatrix.data[i][1] = this.data[i][1]
    newTSMatrix.data[i][2] = this.data[i][2]
  }
  return newTSMatrix
}
TSMatrix.prototype.add = function (otherTSMatrix) {
  if (this.mu !== otherTSMatrix.mu || this.nu !== otherTSMatrix.nu) {
    return false
  }
  let newTSMatrix = new TSMatrix(this.mu, this.nu)
  let i = 0
  let j = 0
  while (i < this.data.length && j < otherTSMatrix.data.length) {
    if (this.data[i][0] < otherTSMatrix.data[j][0]) {
      newTSMatrix.data.push([this.data[i][0], this.data[i][1], this.data[i][2]])
      newTSMatrix.tu++
      i++
    } else if (this.data[i][0] === otherTSMatrix.data[j][0]) {
      if (this.data[i][1] < otherTSMatrix.data[i][1]) {
        newTSMatrix.data.push([this.data[i][0], this.data[i][1], this.data[i][2]])
        newTSMatrix.tu++
        i++
      } else if (this.data[i][1] === otherTSMatrix.data[j][1]) {
        let value = this.data[i][2] + otherTSMatrix.data[j][2]
        if (value !== 0) {
          newTSMatrix.data.push([otherTSMatrix.data[i][0], otherTSMatrix.data[i][1], value])
          newTSMatrix.tu++
          i++
          j++
        }
      } else {
        newTSMatrix.data.push([otherTSMatrix.data[i][0], otherTSMatrix.data[i][1], otherTSMatrix.data[i][2]])
        newTSMatrix.tu++
        j++
      }
    } else {
      newTSMatrix.data.push([otherTSMatrix.data[j][0], otherTSMatrix.data[j][1], otherTSMatrix.data[j][2]])
      newTSMatrix.tu++
      j++
    }
  }
  while (i < this.data.length) {
    newTSMatrix.data.push([this.data[i][0], this.data[i][1], this.data[i][2]])
    newTSMatrix.tu++
    i++
  }
  while (j < otherTSMatrix.data.length) {
    newTSMatrix.data.push([otherTSMatrix.data[j][0], otherTSMatrix.data[j][1], otherTSMatrix.data[j][2]])
    newTSMatrix.tu++
    j++
  }
  newTSMatrix.data.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1]
    return a[0] - b[0]
  })
  return newTSMatrix
}
TSMatrix.prototype.div = function (otherTSMatrix) {
  var newTSMatrix = otherTSMatrix.copy()
  console.log(newTSMatrix)
  for (let i = newTSMatrix.data.length - 1; i >= 0; i--) {
    newTSMatrix.data[i][2] = -newTSMatrix.data[i][2]
  }
  return this.add(newTSMatrix)
}
TSMatrix.prototype.mul = function (otherTSMatrix) {
  if (this.mu !== otherTSMatrix.nu || this.nu !== otherTSMatrix.nu) {
    return false
  }
  var newTSMatrix = new TSMatrix(this.mu, otherTSMatrix.nu)
  for (let i = this.tu - 1; i >= 0; i--) {
    for (let j = otherTSMatrix.tu - 1; j >= 0; j--) {
      if (this.data[i][1] === otherTSMatrix.data[j][0]) {
        let flag = true
        newTSMatrix.data.forEach((value) => {
          if (value[0] === this.data[i][0] && value[1] === otherTSMatrix.data[j][1]) {
            value[2] += this.data[i][2] * otherTSMatrix.data[j][2]
            flag = false
          }
        })
        if (flag) {
          newTSMatrix.data.push([this.data[i][0], otherTSMatrix.data[j][1], this.data[i][2] * otherTSMatrix.data[j][2]])
        }
      }
    }
  }
  return newTSMatrix
}
TSMatrix.prototype.transpose = function () {
  let newTSMatrix = this.copy()
  if (newTSMatrix.tu !== 0) {
    let newData = []
    for (let i = newTSMatrix.tu - 1; i >= 0; i--) {
      newData[i] = []
      newData[i][0] = newTSMatrix.data[i][1]
      newData[i][1] = newTSMatrix.data[i][0]
      newData[i][2] = newTSMatrix.data[i][2]
    }
    newData.sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1]
      return a[0] - b[0]
    })
    newTSMatrix.data = newData
    return newTSMatrix
  }
}
export default {
  data () {
    return {
      TSMatrix_1: null,
      TSMatrix_2: null,
      data_1: [],
      data_2: [],
      result: '无' // 结果
    }
  },
  methods: {
    createTSMatrix () { // 创建转置矩阵
      this.data_1 = []
      this.data_2 = []
      for (let i = 0; i <= 19; i++) {
        this.data_1.push([])
        this.data_2.push([])
        for (let j = 0; j <= 19; j++) {
          let randomNumber = Math.floor(Math.random() * 1000)
          if (randomNumber < 10) {
            this.data_1[i].push(randomNumber)
          } else {
            this.data_1[i].push(0)
          }
          randomNumber = Math.floor(Math.random() * 1000)
          if (randomNumber < 10) {
            this.data_2[i].push(randomNumber)
          } else {
            this.data_2[i].push(0)
          }
        }
      }
      let data1 = []
      let data2 = []
      for (let i = 0; i <= 19; i++) {
        for (let j = 0; j <= 19; j++) {
          if (this.data_1[i][j] !== 0) {
            data1.push([i, j, this.data_1[i][j]])
          }
          if (this.data_2[i][j] !== 0) {
            data2.push([i, j, this.data_2[i][j]])
          }
        }
      }
      this.TSMatrix_1 = new TSMatrix(20, 20, data1.length, data1)
      this.TSMatrix_2 = new TSMatrix(20, 20, data2.length, data2)
    },
    addTSMatrix () {
      this.result = this.TSMatrix_1.add(this.TSMatrix_2)
    },
    divTSMatrix () {
      this.result = this.TSMatrix_1.div(this.TSMatrix_2)
    },
    mulTSMatrix () {
      this.result = this.TSMatrix_1.mul(this.TSMatrix_2)
    },
    transposeTSMatrix () {
      this.result = this.TSMatrix_1.transpose()
    }
  }
}
</script>

<style scoped>
#TSMatrix {
  font-size: 30px;
}
.show-view {
  background-color: #adf;
}
.show-data {
  background-color: #fda;
}
.show-data-example {
  font-size: 18px;
}
.operate-data {
  background-color: #dfa;
}
.operate-data button, .show-data button {
  font-size: 20px;
  border: none;
  background-color: white;
  width: 100px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
}
.summary {
  font-size: 18px;
  background-color: #afe;
}
.summary pre {
  text-align: left;
}
</style>
