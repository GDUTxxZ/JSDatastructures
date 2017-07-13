<template>
  <div id="CirQueue">
    <h1>循环队列</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <span>队头=></span>
      <span class="view-item" v-for="item in cir_queue">{{item}}</span>
      <span><=队尾</span>
      <span>取出元素：</span>
      <span class="view-item">{{get_num}}</span>
    </div>
    <div class="show-data">
      <h2>数据</h2>
      队头=>  {{cir_queue}}  <=队尾
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
        循环队列是用于顺序队列中，出队后队头单元为空，导致假溢出而产生的，而JavaScipt中，数组方法的shift会将数组的第一个单元弹出，并自动让后续单元向前填补，因此JavaScript中的数组可以当作循环队列使用。
        <h3>数据单元为：一个数组</h3>
        <h3>接口</h3>
        <pre>
          enQueue(value) // Array.push()
          deQueue() // Array.deQueue
          clearStack() // =[]
          getHeadQueue() // return Array[0]
        </pre>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cir_queue: [],
      get_num: '无'
    }
  },
  methods: {
    enQueue () {
      this.cir_queue.push(this.getRandomNumber())
      this.get_num = '无'
    },
    deQueue () {
      if (this.cir_queue.length > 0) {
        this.get_num = this.cir_queue.shift() + ''
      }
    },
    getHeadQueue () {
      if (this.cir_queue.length > 0) {
        this.get_num = this.cir_queue[0]
      }
    },
    clearQueue () {
      this.cir_queue = []
    }
  }
}
</script>

<style scoped>
#CirQueue {
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
