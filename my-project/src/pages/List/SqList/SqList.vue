<template>
  <div id="SqList">
    <h1>顺序表</h1>
    <div class="show-view">
      <h2>数据展示</h2>
      <span>表头=></span>
      <span class="view-item" v-for="item in sq_list">{{item}}</span>
      <span><=表尾</span>
      <span>元素序号：</span>
      <span class="view-item">{{num_index}}</span>
    </div>
    <div class="show-data">
      <h2>数据</h2>
      表头=>  {{sq_list}}  <=表尾
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="pushList">添加元素</button>
      <button @click.stop.prevent="popList">删除元素</button>
      <button @click.stop.prevent="searchList">查找元素</button>
      <input type="text" v-model="search_num">
    </div>
    <div class="summary">
      <h2>总结</h2>
      <p>
        顺序表与顺序栈的操作区别不大，因此只展示查找元素一种
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sq_list: [0],
      num_index: '无',
      search_num: 0
    }
  },
  methods: {
    pushList () {
      this.sq_list.push(this.getRandomNumber())
      this.num_index = '无'
    },
    popList () {
      if (this.sq_list.length > 0) {
        this.sq_list.pop()
      }
      this.num_index = '无'
    },
    searchList () {
      let searchNum = parseInt(this.search_num)
      for (var i = this.sq_list.length - 1; i >= 0; i--) {
        if (this.sq_list[i] === searchNum) {
          this.num_index = i
        }
      }
    }
  }
}
</script>

<style scoped>
#SqList {
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
