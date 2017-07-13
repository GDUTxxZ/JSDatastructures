<template>
  <div id="app">
    <ul id="sidebar">
      <list-item v-for="item in dataStructureList" :structure="item"></list-item>
    </ul>
    <router-view class="content"></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import listItem from './components/listItem'
Vue.mixin({
  methods: {
    getRandomNumber () { // 获取0~99之间的整数
      return Math.floor(Math.random() * 100)
    }
  }
})
export default {
  name: 'app',
  components: {
    listItem
  },
  data () {
    return {
      dataStructureList: [
        {
          name: 'Stack-栈',
          children: [
            {
              name: 'SqStack-顺序栈'
            },
            {
              name: 'LinkStack-链栈'
            }
          ]
        },
        {
          name: 'Queue-队列',
          children: [
            {
              name: 'CirQueue-循环队列'
            },
            {
              name: 'LinkQueue-链队列'
            }
          ]
        },
        {
          name: 'List-表',
          children: [
            {
              name: 'SqList-顺序表',
              children: [
                {
                  name: 'SqList-顺序表'
                },
                {
                  name: 'Poly-一元稀疏多项式'
                },
                {
                  name: 'TSMatrix-稀疏矩阵'
                }
              ]
            },
            {
              name: 'LinkList-带头节点的单链表'
            },
            {
              name: 'GList-广义表'
            }
          ]
        },
        {
          name: 'HashTable-哈希表',
          children: [
            {
              name: 'HashTable1-链地址哈希表'
            },
            {
              name: 'HashTable2-开放寻址哈希表'
            }
          ]
        },
        {
          name: 'BiTree-二叉树',
          children: [
            {
              name: 'BiTree-二叉树'
            },
            {
              name: 'Heap-堆'
            },
            {
              name: 'BSTree-二叉查找树'
            },
            {
              name: 'BBSTree-平衡二叉树'
            }
          ]
        },
        {
          name: 'Tree-树',
          children: [
            {
              name: 'Tree-树',
              children: [
                {
                  name: 'PCTree-双亲孩子表示法'
                },
                {
                  name: 'CSTree-孩子兄弟表示法'
                }
              ]
            },
            {
              name: 'MFSet-并查集'
            },
            {
              name: 'BTree-B树'
            },
            {
              name: 'B+Tree-B+树'
            }
          ]
        },
        {
          name: 'Graph-图',
          children: [
            {
              name: 'MGraph-邻接数组'
            },
            {
              name: 'ALGraph-邻接表'
            }
          ]
        },
        {
          name: 'Sort-排序算法'
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  color: #2c3e50;
  text-decoration: none;
}
a:active {
  color: #2c3e50;
}
a:visited {
  color: #2c3e50;
}
#sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 300px;
  margin: 0;
}
ul {
  padding-left: 20px;
  height: 100%;
  overflow-x: hidden;
  background-color: #eee;
}
.content {
  margin-left: 320px;
  text-align: center;
}
</style>
