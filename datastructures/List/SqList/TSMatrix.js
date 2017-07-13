// 稀疏矩阵
function TSMatrix (mu = 0, nu = 0, tu = 0, data = []) {
  this.mu = mu // 行数
  this.nu = nu // 列数
  this.tu = tu // 非零元数
  this.data = data // 三元组
}
TSMatrix.prototype.copy = function () { // 深度复制矩阵
  var newTSMatrix = new TSMatrix(this.mu, this.nu, this.tu)
  for (var i = this.tu - 1; i >= 0; i--) {
    newTSMatrix.data[i] = []
    newTSMatrix.data[i][0] = this.data[i][0]
    newTSMatrix.data[i][1] = this.data[i][1]
    newTSMatrix.data[i][2] = this.data[i][2]
  }
  return newTSMatrix
}
TSMatrix.prototype.add = function (otherTSMatrix) { // 稀疏矩阵相加， 返回结果稀疏矩阵
  if (this.mu !== otherTSMatrix.mu || this.nu !== otherTSMatrix.nu) {
    return false
  }
  let newTSMatrix = new TSMatrix(this.mu, this.nu)
  let i = 0
  let j = 0
  while (i < this.data.length && j < otherTSMatrix.data.length) { // 逐个加入新矩阵
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
  while (i < this.data.length) { // 若有一个矩阵加入完毕，将另一个矩阵都加入
    newTSMatrix.data.push([this.data[i][0], this.data[i][1], this.data[i][2]])
    newTSMatrix.tu++
    i++
  }
  while (j < otherTSMatrix.data.length) { // 若有一个矩阵加入完毕，将另一个矩阵都加入
    newTSMatrix.data.push([otherTSMatrix.data[j][0], otherTSMatrix.data[j][1], otherTSMatrix.data[j][2]])
    newTSMatrix.tu++
    j++
  }
  newTSMatrix.data.sort((a, b) => { // 矩阵有序
    if (a[0] === b[0]) return a[1] - b[1]
    return a[0] - b[0]
  })
  return newTSMatrix
}
TSMatrix.prototype.div = function (otherTSMatrix) { // 稀疏矩阵相减， 返回结果矩阵
  var newTSMatrix = otherTSMatrix.copy()
  for (let i = newTSMatrix.data.length - 1; i >= 0; i--) { // 另一矩阵全置相反数后再想家
    newTSMatrix.data[i][2] = -newTSMatrix.data[i][2]
  }
  return this.add(newTSMatrix)
}
TSMatrix.prototype.mul = function (otherTSMatrix) { // 矩阵乘法
  if (this.mu !== otherTSMatrix.nu || this.nu !== otherTSMatrix.nu) { // 只有行列数匹配的矩阵可以相乘
    return false
  }
  var newTSMatrix = new TSMatrix(this.mu, otherTSMatrix.nu)
  for (let i = this.tu - 1; i >= 0; i--) { // 逐个匹配
    for (let j = otherTSMatrix.tu - 1; j >= 0; j--) { // 逐个匹配
      if (this.data[i][1] === otherTSMatrix.data[j][0]) { // 找出可以相乘的
        let flag = true
        newTSMatrix.data.forEach((value) => { // 若新矩阵中该位置已经有值
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
TSMatrix.prototype.transpose = function () { // 矩阵转置，返回转置后的矩阵
  let newTSMatrix = this.copy()
  if (newTSMatrix.tu !== 0) {
    let newData = []
    for (let i = newTSMatrix.tu - 1; i >= 0; i--) { // 交换行列
      newData[i] = []
      newData[i][0] = newTSMatrix.data[i][1]
      newData[i][1] = newTSMatrix.data[i][0]
      newData[i][2] = newTSMatrix.data[i][2]
    }
    newData.sort((a, b) => { // 重新排序
      if (a[0] === b[0]) return a[1] - b[1]
      return a[0] - b[0]
    })
    newTSMatrix.data = newData
    return newTSMatrix
  }
}