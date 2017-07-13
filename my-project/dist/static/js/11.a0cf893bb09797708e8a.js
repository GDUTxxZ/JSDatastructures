webpackJsonp([11],{116:function(t,a,n){var o=n(64);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(16)("60e0a41a",o,!0)},144:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(){return{sq_stack:[],pop_num:"无"}},methods:{pushStack:function(){this.sq_stack.push(this.getRandomNumber()),this.pop_num="无"},popStack:function(){this.sq_stack.length>0&&(this.pop_num=this.sq_stack.pop()+"")},clearStack:function(){this.sq_stack=[],this.pop_num="无"},getTopStack:function(){if(this.sq_stack.length<1)return"无";this.pop_num=this.sq_stack[this.sq_stack.length-1]}}}},34:function(t,a,n){n(116);var o=n(1)(n(144),n(91),"data-v-6a42c844",null);t.exports=o.exports},64:function(t,a,n){a=t.exports=n(15)(!0),a.push([t.i,"#SqStack[data-v-6a42c844]{font-size:30px}.show-view[data-v-6a42c844]{background-color:#adf}.view-item[data-v-6a42c844]{display:inline-block;width:50px;height:50px;margin:5px;line-height:50px;background-color:#fad}.show-data[data-v-6a42c844]{background-color:#fda}.operate-data[data-v-6a42c844]{background-color:#dfa}.operate-data button[data-v-6a42c844]{font-size:20px;border:none;background-color:#fff;width:100px;height:40px;margin:10px;cursor:pointer}.summary[data-v-6a42c844]{background-color:#afe}","",{version:3,sources:["C:/Users/zxx/Desktop/七行考核/my-project/src/pages/Stack/SqStack.vue"],names:[],mappings:"AACA,0BACE,cAAgB,CACjB,AACD,4BACE,qBAAuB,CACxB,AACD,4BACE,qBAAsB,AACtB,WAAY,AACZ,YAAa,AACb,WAAY,AACZ,iBAAkB,AAClB,qBAAuB,CACxB,AACD,4BACE,qBAAuB,CACxB,AACD,+BACE,qBAAuB,CACxB,AACD,sCACE,eAAgB,AAChB,YAAa,AACb,sBAAwB,AACxB,YAAa,AACb,YAAa,AACb,YAAa,AACb,cAAgB,CACjB,AACD,0BACE,qBAAuB,CACxB",file:"SqStack.vue",sourcesContent:["\n#SqStack[data-v-6a42c844] {\r\n  font-size: 30px;\n}\n.show-view[data-v-6a42c844] {\r\n  background-color: #adf;\n}\n.view-item[data-v-6a42c844] {\r\n  display: inline-block;\r\n  width: 50px;\r\n  height: 50px;\r\n  margin: 5px;\r\n  line-height: 50px;\r\n  background-color: #fad;\n}\n.show-data[data-v-6a42c844] {\r\n  background-color: #fda;\n}\n.operate-data[data-v-6a42c844] {\r\n  background-color: #dfa;\n}\n.operate-data button[data-v-6a42c844] {\r\n  font-size: 20px;\r\n  border: none;\r\n  background-color: white;\r\n  width: 100px;\r\n  height: 40px;\r\n  margin: 10px;\r\n  cursor: pointer;\n}\n.summary[data-v-6a42c844] {\r\n  background-color: #afe;\n}\r\n"],sourceRoot:""}])},91:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{attrs:{id:"SqStack"}},[n("h1",[t._v("顺序栈")]),t._v(" "),n("div",{staticClass:"show-view"},[n("h2",[t._v("数据展示")]),t._v(" "),n("span",[t._v("栈底=>")]),t._v(" "),t._l(t.sq_stack,function(a){return n("span",{staticClass:"view-item"},[t._v(t._s(a))])}),t._v(" "),n("span",[t._v("<=栈顶")]),t._v(" "),n("span",[t._v("取出元素：")]),t._v(" "),n("span",{staticClass:"view-item"},[t._v(t._s(t.pop_num))])],2),t._v(" "),n("div",{staticClass:"show-data"},[n("h2",[t._v("数据")]),t._v("\n    栈底=>  "+t._s(t.sq_stack)+"  <=栈顶\n  ")]),t._v(" "),n("div",{staticClass:"operate-data"},[n("h2",[t._v("数据操作")]),t._v(" "),n("button",{on:{click:function(a){a.stopPropagation(),a.preventDefault(),t.pushStack(a)}}},[t._v("入栈")]),t._v(" "),n("button",{on:{click:function(a){a.stopPropagation(),a.preventDefault(),t.popStack(a)}}},[t._v("出栈")]),t._v(" "),n("button",{on:{click:function(a){a.stopPropagation(),a.preventDefault(),t.clearStack(a)}}},[t._v("清空栈")]),t._v(" "),n("button",{on:{click:function(a){a.stopPropagation(),a.preventDefault(),t.getTopStack(a)}}},[t._v("取栈顶元素")])]),t._v(" "),t._m(0)])},staticRenderFns:[function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"summary"},[n("h2",[t._v("总结")]),t._v(" "),n("p",[t._v("\n      数据操作中，入栈将随机生成0~100的整数，推入栈中。js的Arrey对象内置了push和pop方法，因此一个数组就是一个顺序栈。\n      ")]),n("h3",[t._v("数据单元为：一个数组")]),t._v(" "),n("h3",[t._v("接口")]),t._v(" "),n("pre",[t._v("\n        push(value) // 将value推入栈中\n        pop() // 非空弹出一个元素返回\n        clearStack() // =[]\n        getTopStack() // 类似pop但不弹出该元素\n      ")]),t._v(" "),n("p")])}]}}});
//# sourceMappingURL=11.a0cf893bb09797708e8a.js.map