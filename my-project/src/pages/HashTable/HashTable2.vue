<template>
  <div id="HashTable2">
    <h1>开放寻址哈希表</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <div v-for="item in hash_table.rcd" class="show-view-item">
        {{item.key}}:{{item.value}}<span v-if="item.tag===-1">已删除</span>
      </div>
      <hr>
      结果：{{result}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <div class="operate-data-item">
        <button @click.stop.prevent="initHash">创建</button>
        <input type="text" v-model="size" name="size" placeholder="容量">
        <span class="oprate-data-aux"><=容量（数字）</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="insertHash">插入</button>
        <input type="text" v-model="insertKey" name="insertKey" placeholder="数据">
        <span class="oprate-data-aux"><=数据（一个英文单词，例如zxx）</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="deleteHash">删除</button>
        <input type="text" v-model="deleteKey" name="deleteKey" placeholder="关键字">
        <span class="oprate-data-aux"><=关键字（单词的第一个字符，例如'zxx'的'z'）</span>
      </div>
      <div class="operate-data-item">
        <button @click.stop.prevent="searchHash">查找</button>
        <input type="text" v-model="searchKey" name="searchKey" placeholder="关键字">
        <span class="oprate-data-aux"><=关键字（单词的第一个字符，例如'zxx'的'z'）</span>
      </div>
    </div>
    <div class="summary">
      <h2>总结：为简便，直接使用输入value的首字符运算出hash</h2>
      <h3>哈希表结构：</h3>
      <pre>
        {
          hash_table: [], // 表
          size: 0,  // 表的容量
          count: 0, // 当前已用
        }
      </pre>
      <h3>表节点结构：</h3>
      <pre>
        {
          key: //关键字
          value: //值
          tag: //0：空   1：有效   -1：无效
        }
      </pre>
      <h3>大部分操作与链地址哈希表相似</h3>
    </div>
  </div>
</template>

<script>
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
export default {
  data () {
    return {
      size: 5,
      hash_table: null,
      searchKey: '',
      insertKey: '',
      deleteKey: '',
      result: '无'
    }
  },
  beforeMount () {
    this.hash_table = new HashTable2(this.hash, this.collision, this.size)
  },
  methods: {
    hash (key) {
      return (key.charCodeAt(0) % this.size)
    },
    collision (hash) {
      return (hash + 1) % this.size
    },
    initHash () {
      this.hash_table = new HashTable2(this.hash, this.collision, this.size)
    },
    searchHash () {
      this.result = this.hash_table.search(this.searchKey)
    },
    insertHash () {
      this.result = this.hash_table.insert({
        key: this.insertKey[0],
        value: this.insertKey
      })
      this.$forceUpdate()
    },
    deleteHash () {
      this.result = this.hash_table.delete(this.deleteKey)
    }
  }
}
</script>

<style scoped>
#HashTable2 {
  font-size: 20px;
}
.show-view {
  background-color: #adf;
}
.show-view-item {
  display: inline-block;
  width: 100px;
  margin: 5px;
  line-height: 50px;
  background-color: #fad;
}
.show-data {
  background-color: #fda;
}
.show-data pre {
  text-align: left;
}
.operate-data {
  background-color: #dfa;
}
.operate-data button {
  font-size: 20px;
  border: none;
  background-color: white;
  width: 70px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
}
.operate-data input {
  width: 100px;
  height: 37px;
  padding: 0;
  position: relative;
  right: 17px;
  bottom: 4px;
  text-align: center;
}
.oprate-data-aux {
  font-size: 20px;
  position: relative;
  right: 17px;
}
.summary {
  background-color: #afe;
}
.summary pre {
  text-align: left;
}
</style>
