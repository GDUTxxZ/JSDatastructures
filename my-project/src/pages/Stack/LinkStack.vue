<template>
  <div id="LinkStack">
    <h1>链栈</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <span>栈底=></span>
      <showLinkItem :LinkData="link_stack"></showLinkItem>
      <span><=栈顶</span>
      <span>取出元素：</span>
      <span class="view-item">{{pop_num}}</span>
    </div>
    <div class="show-data">
      <h2>数据</h2>
      <pre>
        {{show_data}}
      </pre>
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="pushStack">入栈</button>
      <button @click.stop.prevent="popStack">出栈</button>
      <button @click.stop.prevent="clearStack">清空栈</button>
      <button @click.stop.prevent="getTopStack">取栈顶元素</button>
    </div>
    <div class="summary">
      <h2>总结</h2>
      <p>
        <h3>数据单元为：</h3>
        <pre>
        {
          value: Number // 数据
          next: Object // 下一单元
        }
        </pre>
        <h3>接口</h3>
        <pre>
          isEmpty() // 判空，若空返回true，非空返回false
          push(value) // 将value推入栈中
          pop() // 先判空，若空返回false，非空弹出一个元素返回
          clearStack() // value=null next=null
          getTopStack() // 类似pop但不弹出该元素
        </pre>
      </p>
    </div>
  </div>
</template>

<script>
import showLinkItem from '../../components/showLinkItem'
// {
//   value: Number,  当前值
//   next: Obeject   下一位
// }
function LinkStack (value) {
  this.value = null
  this.next = null
  if (value) { this.value = value }
}
LinkStack.prototype.isEmpty = function () {
  if (this.value === null) return true
  else return false
}
LinkStack.prototype.push = function (value) {
  let linkStack = this
  if (!this.value) {
    this.value = value
    return
  }
  while (linkStack.next) {
    linkStack = linkStack.next
  }
  linkStack.next = {
    value: value,
    next: null
  }
}
LinkStack.prototype.pop = function () {
  let linkStack = this
  if (this.isEmpty()) { return false }
  if (linkStack.next === null) {
    let returnData = linkStack.value
    this.value = null
    return returnData
  } else {
    while (linkStack.next.next) {
      linkStack = linkStack.next
    }
    let returnData = linkStack.next.value
    linkStack.next = null
    return returnData
  }
}
LinkStack.prototype.clearStack = function () {
  this.value = null
  this.next = null
}
LinkStack.prototype.getTopStack = function () {
  let linkStack = this
  if (this.isEmpty()) { return false }
  while (linkStack.next) {
    linkStack = linkStack.next
  }
  return linkStack.value
}
export default {
  data () {
    return {
      link_stack: new LinkStack(this.getRandomNumber()),
      pop_num: '无'
    }
  },
  components: {
    showLinkItem
  },
  computed: {
    show_data () {
      return JSON.stringify(this.link_stack).replace(/,/g, ',\n')
    }
  },
  methods: {
    pushStack () {
      this.link_stack.push(this.getRandomNumber())
      this.pop_num = '无'
    },
    popStack () {
      this.pop_num = this.link_stack.pop()
    },
    clearStack () {
      this.link_stack.clearStack()
      this.pop_num = '无'
    },
    getTopStack () {
      this.pop_num = this.link_stack.getTopStack()
    }
  }
}
</script>

<style scoped>
#LinkStack {
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
