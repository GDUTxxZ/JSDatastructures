<template>
  <div id="LinkQueue">
    <h1>链队列</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <span>队头=></span>
      <showLinkItem :LinkData="link_queue"></showLinkItem>
      <span><=队尾</span>
      <span>取出元素：</span>
      <span class="view-item">{{get_num}}</span>
    </div>
    <div class="show-data">
      <h2>数据</h2>
      <pre>
        {{show_data}}
      </pre>
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="enQueue">入队</button>
      <button @click.stop.prevent="deQueue">出队</button>
      <button @click.stop.prevent="getHeadQueue">取队头元素</button>
      <button @click.stop.prevent="clearQueue">清空队列</button>
    </div>
    <div class="summary">
      <h2>总结</h2>
      <p>
        <h3>数据单元为：(头节点value无用，仅用于引用链队列)</h3>
        <pre>
        {
          value: Number // 数据
          next: Object // 下一单元
        }
        </pre>
        <h3>接口</h3>
        <pre>
          isEmpty() // 空返回true, 非空返回false
          enQueue(value) // 入队
          deQueue() // 出队
          getHeadQueue() // 取队头元素
          clearQueue() // 清空队列
        </pre>
      </p>
    </div>
  </div>
</template>

<script>
import showLinkItem from '../../components/showLinkItem'
function LinkQueue (value = null) {
  this.value = value
  this.next = null
}
LinkQueue.prototype.isEmpty = function () {
  if (this.next !== null) {
    return false
  } else {
    return true
  }
}
LinkQueue.prototype.enQueue = function (value) {
  let queue = this
  while (queue.next) {
    queue = queue.next
  }
  queue.next = new LinkQueue(value)
}
LinkQueue.prototype.deQueue = function () {
  if (this.isEmpty()) {
    return false
  } else {
    let returnData = this.next.value
    this.next = this.next.next
    return returnData
  }
}
LinkQueue.prototype.getHeadQueue = function () {
  if (this.isEmpty()) {
    return false
  } else {
    return this.next.value
  }
}
LinkQueue.prototype.clearQueue = function () {
  this.next = null
}
export default {
  data () {
    return {
      link_queue: new LinkQueue('头'),
      get_num: '无'
    }
  },
  computed: {
    show_data () {
      return JSON.stringify(this.link_queue).replace(/,/g, ',\n')
    }
  },
  components: {
    showLinkItem
  },
  methods: {
    enQueue () {
      this.link_queue.enQueue(this.getRandomNumber())
      this.get_num = '无'
    },
    deQueue () {
      this.get_num = this.link_queue.deQueue()
    },
    getHeadQueue () {
      this.get_num = this.link_queue.getHeadQueue()
    },
    clearQueue () {
      this.link_queue.clearQueue()
    }
  }
}
</script>

<style scoped>
#LinkQueue {
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
