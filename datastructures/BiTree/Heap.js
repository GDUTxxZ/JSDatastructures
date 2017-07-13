  function Heap (tag, prior, rcd = []) {
    if (!(tag === 1 || tag === 0) || !prior) {
      return false
    }
    this.rcd = []
    this.tag = tag // 0表示小顶堆 ， 1表示大顶堆
    this.prior = prior
    this.rcd.unshift(this.tag) // 第一单元放一个标志
    for (let i = rcd.length - 1; i >= 0; i--) {
      this.insert({
        key: rcd[i],
        value: rcd[i]
      })
    }
  }
  Heap.prototype.shiftDown = function (pos) { // 堆筛选
    while (pos <= (this.rcd.length - 1) / 2) { // 不需筛选子叶节点
      let c = pos * 2 // pos的左子节点
      let rc = pos * 2 + 1 // pos的右子节点
      if (rc <= this.rcd.length - 1 && this.prior(this.rcd[rc].key, this.rcd[c].key)) { // 若左右节点均存在
        c = rc // 此时c为更接近根的节点
      }
      if (this.prior(this.rcd[pos].key, this.rcd[c].key)) { // 若根节点位置不需调整
        return
      }
      this.swapElem(pos, c) // 否则交换pos和c
      pos = c // 继续向下筛选
    }
  }
  Heap.prototype.insert = function (data) { // 堆插入
    let curr = this.rcd.length
    this.rcd[curr] = { // 先把元素插入堆尾
      key: data.key,
      value: data.value
    }
    while (curr !== 1 && this.prior(this.rcd[curr].key, this.rcd[Math.floor(curr / 2)].key)) { // 从堆尾向上筛选调整
      this.swapElem(curr, Math.floor(curr / 2))
      curr = Math.floor(curr / 2)
    }
  }
  Heap.prototype.remove = function (pos) { // 堆移除
    let elem = this.rcd[pos] // 获取要移除的元素，用于返回
    this.swapElem(pos, this.rcd.length - 1) // 将该元素与堆尾交换
    this.rcd.splice(this.rcd.length - 1, 1) // 删除堆尾元素
    let curr = pos
    while (curr !== 1 && this.prior(this.rcd[curr].key, this.rcd[Math.floor(curr / 2)].key)) { // 将该结点不断向上交换位置至合适位置
      this.swapElem(curr, Math.floor(curr / 2))
      curr = Math.floor(curr / 2)
    }
    for (let i = curr; i <= this.rcd.length - 1; i++) { // 调整以合适位置的节点为根的子堆
      this.shiftDown(i)
    }
    return elem
  }
  Heap.prototype.swapElem = function (i, j) { // 交换两个堆元素
    if (i <= 0 || j <= 0 || i >= this.rcd.length || j >= this.rcd.length) {
      return false
    }
    let temp = this.rcd[i]
    this.rcd[i] = this.rcd[j]
    this.rcd[j] = temp
    return true
  }