// 链地址哈希表
function HashTable1 (hash, size = 10) {
  if (!hash) {
    return false
  }
  this.rcd = []
  this.count = 0
  this.hash = hash
  this.size = size
  for (let i = this.size - 1; i >= 0; i--) {
    this.rcd.push(null)
  }
}
HashTable1.prototype.search = function (key) {
  let hashKey = this.hash(key)
  let data = this.rcd[hashKey]
  if (data === null) {
    return null
  } else {
    while (data !== null) {
      if (data.key === key) {
        return data
      }
      data = data.next
    }
    return null
  }
}
HashTable1.prototype.insert = function (data) {
  let hashKey = this.hash(data.key)
  if (this.search(data.key)) {
    return false
  }
  if (this.rcd[hashKey] === null) {
    this.rcd[hashKey] = {
      key: data.key,
      value: data.value,
      next: null
    }
  } else {
    let hashTableItem = this.rcd[hashKey]
    while (hashTableItem.next !== null) {
      hashTableItem = hashTableItem.next
    }
    hashTableItem.next = {
      key: data.key,
      value: data.value,
      next: null
    }
  }
  this.count++
  return true
}
HashTable1.prototype.delete = function (key) {
  let hashKey = this.hash(key)
  let data = this.rcd[hashKey]
  if (data === null) {
    return null
  } else if (data.key === key) {
    this.rcd[hashKey] = data.next
    data.next = null
    this.count--
    return data
  } else {
    while (data.next !== null) {
      if (data.next.key === key) {
        let _data = data.next
        data.next = data.next.next
        _data.next = null
        this.count--
        return _data
      }
      data = data.next
    }
    return null
  }
}