import Vue from 'vue'
import Router from 'vue-router'

const LinkStack = r => require.ensure([], () => r(require('../pages/Stack/LinkStack')), 'LinkStack')
const SqStack = r => require.ensure([], () => r(require('../pages/Stack/SqStack')), 'SqStack')
const CirQueue = r => require.ensure([], () => r(require('../pages/Queue/CirQueue')), 'CirQueue')
const LinkQueue = r => require.ensure([], () => r(require('../pages/Queue/LinkQueue')), 'LinkQueue')
const SqList = r => require.ensure([], () => r(require('../pages/List/SqList/SqList')), 'SqList')
const Poly = r => require.ensure([], () => r(require('../pages/List/SqList/Poly')), 'Poly')
const TSMatrix = r => require.ensure([], () => r(require('../pages/List/SqList/TSMatrix')), 'TSMatrix')
const LinkList = r => require.ensure([], () => r(require('../pages/List/LinkList')), 'LinkList')
const GList = r => require.ensure([], () => r(require('../pages/List/GList')), 'GList')
const HashTable1 = r => require.ensure([], () => r(require('../pages/HashTable/HashTable1')), 'HashTable1')
const HashTable2 = r => require.ensure([], () => r(require('../pages/HashTable/HashTable2')), 'HashTable2')
const BiTree = r => require.ensure([], () => r(require('../pages/BiTree/BiTree')), 'BiTree')
const Heap = r => require.ensure([], () => r(require('../pages/BiTree/Heap')), 'Heap')
const BSTree = r => require.ensure([], () => r(require('../pages/BiTree/BSTree')), 'BSTree')
const BBSTree = r => require.ensure([], () => r(require('../pages/BiTree/BBSTree')), 'BBSTree')
const PCTree = r => require.ensure([], () => r(require('../pages/Tree/Tree/PCTree')), 'PCTree')
const CSTree = r => require.ensure([], () => r(require('../pages/Tree/Tree/CSTree')), 'CSTree')
const MFSet = r => require.ensure([], () => r(require('../pages/Tree/MFSet')), 'MFSet')
const BTree = r => require.ensure([], () => r(require('../pages/Tree/BTree')), 'BTree')
const BpTree = r => require.ensure([], () => r(require('../pages/Tree/B+Tree')), 'B+Tree')
const MGraph = r => require.ensure([], () => r(require('../pages/Graph/MGraph')), 'MGraph')
const ALGraph = r => require.ensure([], () => r(require('../pages/Graph/ALGraph')), 'ALGraph')
const Sort = r => require.ensure([], () => r(require('../pages/Sort/Sort')), 'Sort')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App'
    },
    {
      path: '/LinkStack',
      component: LinkStack
    },
    {
      path: '/SqStack',
      component: SqStack
    },
    {
      path: '/CirQueue',
      component: CirQueue
    },
    {
      path: '/LinkQueue',
      component: LinkQueue
    },
    {
      path: '/SqList',
      component: SqList
    },
    {
      path: '/Poly',
      component: Poly
    },
    {
      path: '/TSMatrix',
      component: TSMatrix
    },
    {
      path: '/LinkList',
      component: LinkList
    },
    {
      path: '/GList',
      component: GList
    },
    {
      path: '/HashTable1',
      component: HashTable1
    },
    {
      path: '/HashTable2',
      component: HashTable2
    },
    {
      path: '/BiTree',
      component: BiTree
    },
    {
      path: '/Heap',
      component: Heap
    },
    {
      path: '/BSTree',
      component: BSTree
    },
    {
      path: '/BBSTree',
      component: BBSTree
    },
    {
      path: '/PCTree',
      component: PCTree
    },
    {
      path: '/CSTree',
      component: CSTree
    },
    {
      path: '/MFSet',
      component: MFSet
    },
    {
      path: '/BTree',
      component: BTree
    },
    {
      path: '/B+Tree',
      component: BpTree
    },
    {
      path: '/MGraph',
      component: MGraph
    },
    {
      path: '/ALGraph',
      component: ALGraph
    },
    {
      path: '/Sort',
      component: Sort
    }
  ]
})
