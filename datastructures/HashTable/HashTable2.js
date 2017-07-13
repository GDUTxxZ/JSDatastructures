// 开放寻址哈希表
function HashTable2 (hash, collision, size = 10) {
  if (!hash || !collision) {
    return false
  }
  this.count = 0
  this.rcd = []
  this.hash = hash
  this.collision = collision
  this.size = size
  for (let i = this.size - 1; i >= 0; i--) {
    this.rcd.push({
      key: null,
      value: null,
      tag: 0
    })
  }
  return this
}
HashTable2.prototype.search = function (key) {
  let hash = this.hash(key)
  for (let i = this.count; i >= 0; i--) {
    if (this.rcd[hash].key === key && this.rcd[hash].tag === 1) {
      return this.rcd[hash]
    }
    hash = this.collision(hash)
  }
  return false
}
HashTable2.prototype.insert = function (data) {
  let hash = this.hash(data.key)
  if (this.search(data.key) || this.size === this.count) {
    return false
  }
  for (let i = this.size - 1; i >= 0; i--) {
    if (this.rcd[hash].tag !== 1) {
      this.rcd[hash] = {
        key: data.key,
        value: data.value,
        tag: 1
      }
      this.count++
      return true
    } else {
      hash = this.collision(hash)
    }
  }
  return false
}
HashTable2.prototype.delete = function (key) {
  let data = this.search(key)
  if (data) {
    data.tag = -1
    this.count--
    return {
      key: data.key,
      value: data.value
    }
  }
  return false
}