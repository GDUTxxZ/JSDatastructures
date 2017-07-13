<template>
  <div id="SqStack">
    <h1>顺序栈</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <span>栈底=></span>
      <span class="view-item" v-for="item in sq_stack">{{item}}</span>
      <span><=栈顶</span>
      <span>取出元素：</span>
      <span class="view-item">{{pop_num}}</span>
    </div>
    <div class="show-data">
      <h2>数据</h2>
      栈底=>  {{sq_stack}}  <=栈顶
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
        数据操作中，入栈将随机生成0~100的整数，推入栈中。js的Arrey对象内置了push和pop方法，因此一个数组就是一个顺序栈。
        <h3>数据单元为：一个数组</h3>
        <h3>接口</h3>
        <pre>
          push(value) // 将value推入栈中
          pop() // 非空弹出一个元素返回
          clearStack() // =[]
          getTopStack() // 类似pop但不弹出该元素
        </pre>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sq_stack: [],
      pop_num: '无'
    }
  },
  methods: {
    pushStack () {
      this.sq_stack.push(this.getRandomNumber())
      this.pop_num = '无'
    },
    popStack () {
      if (this.sq_stack.length > 0) {
        this.pop_num = this.sq_stack.pop() + ''
      }
    },
    clearStack () {
      this.sq_stack = []
      this.pop_num = '无'
    },
    getTopStack () {
      if (this.sq_stack.length < 1) { return '无' }
      this.pop_num = this.sq_stack[this.sq_stack.length - 1]
    }
  }
}
</script>

<style scoped>
#SqStack {
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
</style>
