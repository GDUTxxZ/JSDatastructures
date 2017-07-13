<template>
  <div id="LinkList">
    <h1>带头节点的单链表</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <span>(第一项为链表长度)表头=></span>
      <showLinkItem :LinkData="link_list"></showLinkItem>
      <span><=表尾</span>
      <div>当前：{{JSON.stringify(node)}}</div>
      <div>返回: {{result}}</div>
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="searchData">查找</button>
      <input type="text" v-model="search_value">
      <button @click.stop.prevent="insertData">插入数据</button>
      <button @click.stop.prevent="deletData">取出数据</button>
      <button @click.stop.prevent="sortList">排序</button>
      <button @click.stop.prevent="inverseList">逆序</button>
    </div>
    <div class="summary">
      <h2>总结（各种链表在实现和操作上不同之处极少，仅实现单链表）</h2>
      <p>
        <h3>数据结构（头节点value为链表长度）:</h3>
        <pre>
          {
            value: // 数据
            next: // 下一节点
          }
        </pre>
        <h3>接口</h3>
          isEmpty() // 空返回true, 非空返回false
          getLength() // 返回链表长度
          searchData(value) // 返回value相同的节点，查不到返回null
          insertData(linkNode, value) // 在linkNode后插入一个值为value的节点, 失败返回false
          deletData(linkNode, value) // 删除并返回linkNode后一个节点, 失败返回false
          sortList() // 排序
          inverseList() // 逆序
      </p>
    </div>
  </div>
</template>

<script>
import showLinkItem from '../../components/showLinkItem'
function LinkList (value) {
  this.value = null
  this.next = null
  if (value) {
    this.value = value
  } else {
    this.value = 0
  }
}
LinkList.prototype.getLength = function () {
  return this.value
}
LinkList.prototype.isEmpty = function () {
  if (this.value === 0) {
    return true
  } else {
    return false
  }
}
LinkList.prototype.searchData = function (value) {
  var listNode = this.next
  while (listNode.value !== value && listNode.next !== null) {
    listNode = listNode.next
  }
  return listNode
}
LinkList.prototype.insertData = function (linkNode, value) {
  if (linkNode === null) { return false }
  linkNode.next = {
    value: value,
    next: linkNode.next
  }
  this.value++
}
LinkList.prototype.deletData = function (root, linkNode) {
  if (linkNode === null || linkNode.next === null) {
    return false
  } else {
    let result = linkNode.next
    linkNode.next = linkNode.next.next
    root.value--
    return result
  }
}
LinkList.prototype.sortList = function (sortFunc) {
  if (this.isEmpty()) {
    return false
  }
  let list = this.next
  let newData = []
  for (let i = this.value - 1; i >= 0; i--) {
    newData.push(list.value)
    list = list.next
  }
  newData.sort(sortFunc)
  list = this.next
  for (let i = this.value - 1; i >= 0; i--) {
    list.value = newData[i]
    list = list.next
  }
}
LinkList.prototype.inverseList = function () {
  if (this.isEmpty()) {
    return false
  }
  let link = this.next
  let newData = []
  for (let i = this.value - 1; i >= 0; i--) {
    newData.push(link.value)
    link = link.next
  }
  link = this.next
  for (let i = this.value - 1; i >= 0; i--) {
    link.value = newData[i]
    link = link.next
  }
}
export default {
  data () {
    return {
      link_list: new LinkList(),
      result: '无',
      search_value: 0,
      node: null
    }
  },
  components: {
    showLinkItem
  },
  mounted () {
    this.node = this.link_list
  },
  methods: {
    searchData () {
      this.node = this.link_list.searchData(parseInt(this.search_value))
      this.result = JSON.stringify(this.node)
    },
    insertData () {
      this.link_list.insertData(this.node, this.getRandomNumber())
      this.result = '无'
    },
    deletData () {
      this.result = JSON.stringify(this.link_list.deletData(this.link_list, this.node))
    },
    sortList () {
      this.link_list.sortList((a, b) => {
        return b - a
      })
      this.result = '无'
    },
    inverseList () {
      this.link_list.inverseList()
      this.result = '无'
    }
  }
}
</script>

<style scoped>
#LinkList {
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
.operate-data input {
  width: 70px;
  height: 37px;
  padding: 0;
  position: relative;
  right: 17px;
  bottom: 4px;
  text-align: center;
}
.summary {
  background-color: #afe;
}
</style>
