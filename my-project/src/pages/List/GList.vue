<template>
  <div id="GList">
    <h1>广义表</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <span>(第一项为链表长度)表头=></span>
      <showGListItem :GListData="g_list"></showGListItem>
      <span><=表尾</span>
      <span>返回：</span>
      <span>{{result}}</span>
    </div>
    <div class="show-data">
      <h2>数据</h2>
      <div>{{g_list}}</div>
      深度：{{depth}}
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="append">在尾部插入</button>
      <button @click.stop.prevent="insertHead">在头部插入</button>
      <button @click.stop.prevent="getTail">返回表尾</button>
      <button @click.stop.prevent="getHead">返回表头</button>
      <button @click.stop.prevent="deleteHead">删除表头</button>
    </div>
    <div class="summary">
      <h2>总结</h2>
      <p>
        为方便使用，插入数据中，直接生成与原表深度相同的表插入，数据结构直接使用了数组，由于JavaScript是弱类型语言，因此数组就可以很好的承担广义表中，元素既可以是值又可以是表的功能。Array[0]即为表头，Array.slice(1, Array.length)即为表尾
      </p>
      <h3>接口：</h3>
      <pre>
        isEmpty() // 判空，空返回true，非空返回false
        getDepth() // 用递归方法求深度，返回深度
        getHead() // 返回表头
        getTail() // 返回表尾
        insertHead(value) // 在头部插入元素
        append(value) // 在尾部插入元素
        deleteHead() // 删除并返回头部
      </pre>
    </div>
  </div>
</template>

<script>
import showGListItem from '../../components/showGListItem'
function GList () {
  var list = []
  list.isEmpty = function () {
    if (this.length === 0) {
      return true
    } else {
      return false
    }
  }
  list.getDepth = function () {
    return (function getGListDepth (list) {
      if (!Array.isArray(list)) {
        return 0
      }
      if (list === null) {
        return 1
      }
      let head = list[0]
      let tail = null
      if (list.slice && list.length > 1) {
        tail = list.slice(1, list.length)
      }
      let depthHead = getGListDepth(head) + 1
      let depthTail = getGListDepth(tail)
      return depthHead >= depthTail ? depthHead : depthTail
    })(this)
  }
  list.getHead = function () {
    if (this.isEmpty()) {
      return null
    }
    return this[0]
  }
  list.getTail = function () {
    if (this.length < 2) { return null }
    return this.slice(1, this.length)
  }
  list.insertHead = function (value) {
    this.unshift(value)
  }
  list.append = function (value) {
    this.push(value)
  }
  list.deleteHead = function () {
    if (this.isEmpty()) { return false }
    return this.shift()
  }
  return list
}
export default {
  data () {
    return {
      g_list: new GList(),
      depth: 0,
      result: '无'
    }
  },
  watch: {
    g_list () {
      this.depth = this.g_list.getDepth()
    }
  },
  components: {
    showGListItem
  },
  methods: {
    append () {
      if (this.depth === 0) {
        this.g_list.append(1)
      } else {
        let newData = []
        this.g_list.append(newData)
        for (let i = this.depth - 1; i >= 0; i--) {
          if (i === 0) {
            newData.push(this.depth + 1)
            break
          }
          newData.push([])
          newData = newData[0]
        }
      }
      this.result = '无'
    },
    insertHead () {
      if (this.depth === 0) {
        this.g_list.insertHead(1)
      } else {
        let newData = []
        this.g_list.insertHead(newData)
        for (let i = this.depth - 1; i >= 0; i--) {
          if (i === 0) {
            newData.push(this.depth + 1)
            break
          }
          newData.push([])
          newData = newData[0]
        }
      }
      this.result = '无'
    },
    getHead () {
      this.result = this.g_list.getHead()
    },
    getTail () {
      this.result = this.g_list.getTail()
    },
    deleteHead () {
      this.result = this.g_list.deleteHead()
    }
  }
}
</script>

<style scoped>
#GList {
  font-size: 30px;
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
  width: 100px;
  height: 40px;
  margin: 10px;
  cursor: pointer;
}
.summary {
  background-color: #afe;
}
.summary pre {
  text-align: left;
}
</style>
