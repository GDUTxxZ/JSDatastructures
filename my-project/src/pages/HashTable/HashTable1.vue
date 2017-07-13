<template>
  <div id="HashTable1">
    <h1>链地址哈希表</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <div v-for="item in show_data" class="show-view-item">
        <ShowHashTable1 :HashData="item"></ShowHashTable1>
      </div>
      <hr>
      结果：{{result}}
    </div>
    <!-- <div class="show-data">
      <h2>数据</h2>
      <pre>
        {{hash_table}}
      </pre>
    </div> -->
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
          size: 1 // 表容量
        }
      </pre>
      <h3>表节点结构：</h3>
      <pre>
        {
          key: //关键字
          value: //值
          next: //下一节点指针
        }
      </pre>
      <h3>接口：</h3>
      <pre>
        search(key) // 传入关键字，返回检索出的对象或者null
        insert(data) // 传入一个表节点，返回true成功，false失败
        delete(key) // 传入关键字，返回删除的对象
      </pre>
    </div>
  </div>
</template>

<script>
import ShowHashTable1 from '../../components/ShowHashTable1'
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
export default {
  data () {
    return {
      hash_table: null,
      show_data: null,
      size: 10,
      searchKey: '',
      insertKey: '',
      deleteKey: '',
      result: '无'
    }
  },
  components: {
    ShowHashTable1
  },
  methods: {
    newShowData () {
      let showData = []
      for (let i = 0; i < this.hash_table.rcd.length; i++) {
        let data = this.hash_table.rcd[i]
        showData.push([])
        showData[i].push('null')
        while (data !== null) {
          showData[i].push(data.key + ' : ' + data.value)
          data = data.next
        }
      }
      this.show_data = showData
    },
    hash (key) {
      return (key.charCodeAt(0) % this.size)
    },
    initHash () {
      this.hash_table = new HashTable1(this.hash, this.size)
      this.newShowData()
    },
    insertHash () {
      this.result = this.hash_table.insert({
        key: this.insertKey[0],
        value: this.insertKey,
        next: null
      })
      this.newShowData()
    },
    deleteHash (key) {
      this.result = this.hash_table.delete(this.deleteKey)
      this.newShowData()
    },
    searchHash (key) {
      this.result = this.hash_table.search(this.searchKey)
      this.newShowData()
    }
  }
}
</script>

<style scoped>
#HashTable1 {
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
