<template>
  <div id="Poly">
    <h1>一元稀疏多项式</h1>
    <div class="show-view">
      <h2>运算结果</h2>
      {{result}}
    </div>
    <div class="show-data">
      <h2>数据输入</h2>
      <input type="text" v-model="poly_a">
      <input type="text" v-model="poly_b">
      <span class="show-data-example">例如：6*X^1+5*X^3+28*X^14(系数应降序)</span>
    </div>
    <div class="operate-data">
      <h2>数据操作</h2>
      <button @click.stop.prevent="addPoly">加法</button>
      <button @click.stop.prevent="subPoly">减法</button>
      <button @click.stop.prevent="mulPoly">乘法</button>
      <button @click.stop.prevent="divPoly">除法</button>
    </div>
    <div class="summary">
      <h2>总结（由于代码太过冗长，因此只贴出核心代码）</h2>
      <p>
        <h3>一元稀疏多项式表示为一个数组，每一项作为数组一个元素按指数升序存储，每一项定义为：</h3>
        <pre>
        {
          coef: Number // 系数
          expn: Number // 指数
        }
        </pre>
        <h3>接口</h3>
        <pre>
          add(Poly) // 一个多项式加另一多项式，返回一个多项式
          sub(Poly) // 一个多项式减另一多项式，返回一个多项式
          mul(Poly) // 一个多项式乘另一多项式，返回一个多项式
          div(Poly) // 一个多项式初另一多项式，返回一个字符串
        </pre>
      </p>
    </div>
  </div>
</template>

<script>
function Poly (polyStr) {
  let poly = []
  if (polyStr !== undefined) {
    let polyArr = polyStr.replace(/-/g, '+-').split('+')
    for (let i in polyArr) {
      if (!polyArr[i].split('*X^')[1]) {
        poly.push({
          coef: parseInt(polyArr[i].split('*X^')[0]),
          expn: 0
        })
      } else {
        poly.push({
          coef: parseInt(polyArr[i].split('*X^')[0]),
          expn: parseInt(polyArr[i].split('*X^')[1])
        })
      }
    }
  }
  poly.copy = function () {
    let newPloy = new Poly()
    for (let i = 0; i < poly.length; i++) {
      newPloy.push({
        coef: poly[i].coef,
        expn: poly[i].expn
      })
    }
    return newPloy
  }
  poly.add = function (anotherPoly) {
    let i = poly.length - 1
    let j = anotherPoly.length - 1
    let newPloy = new Poly()
    while (i >= 0 || j >= 0) {
      if (i < 0) {
        while (j >= 0) {
          newPloy.unshift(anotherPoly[j--])
        }
      } else if (j < 0) {
        while (i >= 0) {
          newPloy.unshift(poly[i--])
        }
      } else {
        if (poly[i].expn < anotherPoly[j].expn) {
          newPloy.unshift(anotherPoly[j--])
        } else if (poly[i].expn > anotherPoly[j].expn) {
          newPloy.unshift(poly[i--])
        } else {
          newPloy.unshift({
            expn: poly[i].expn,
            coef: poly[i--].coef + anotherPoly[j--].coef
          })
        }
      }
    }
    return newPloy
  }
  poly.sub = function (anotherPoly) {
    for (let i = anotherPoly.length - 1; i >= 0; i--) {
      anotherPoly[i].coef = 0 - anotherPoly[i].coef
    }
    return poly.add(anotherPoly)
  }
  poly.mul = function (anotherPoly) {
    var newPloy = new Poly()
    for (let i = poly.length - 1; i >= 0; i--) {
      for (let j = anotherPoly.length - 1; j >= 0; j--) {
        let flag = false
        let expn = poly[i].expn + anotherPoly[j].expn
        newPloy.forEach((value) => {
          if (value.expn === expn) {
            value.coef += poly[i].coef * anotherPoly[j].coef
            flag = true
          }
        })
        if (!flag) {
          newPloy.push({
            coef: poly[i].coef * anotherPoly[j].coef,
            expn: poly[i].expn + anotherPoly[j].expn
          })
        }
      }
    }
    newPloy.sort((a, b) => {
      return a.expn - b.expn
    })
    return newPloy
  }
  poly.div = function (anotherPoly) {
    let poly1 = poly
    let poly2 = anotherPoly
    let minExpn = poly1[0].expn
    let str = ''
    if (poly1.length === poly2.length) {
      let mulCoef = poly1[0].coef / poly2[0].coef
      let divExpn = poly1[0].expn - poly2[0].expn
      for (var i = poly1.length - 1; i >= 0; i--) {
        if (!(poly1[i].coef / poly2[i].coef === mulCoef) || !(poly1[i].expn - poly2[i].expn === divExpn)) {
          break
        }
        if (i === 0) {
          if (mulCoef < 1) {
            if (divExpn < 0) {
              return '1/' + (poly2[0].coef / poly1[0].coef) + '*X^' + (poly2[0].expn - poly1[0].expn)
            } else if (divExpn === 0) {
              return '1/' + (poly2[0].coef / poly1[0].coef)
            } else if (divExpn > 0) {
              return 'X^' + divExpn + '/' + (poly2[0].coef / poly1[0].coef)
            }
          } else if (mulCoef === 1) {
            if (divExpn < 0) {
              return '1/' + 'X^' + (poly2[0].expn - poly1[0].expn)
            } else if (divExpn === 0) {
              return '1'
            } else if (divExpn > 0) {
              return 'X^' + divExpn
            }
          } else if (mulCoef > 1) {
            if (divExpn < 0) {
              return mulCoef + '/X^' + (poly2[0].expn - poly1[0].expn)
            } else if (divExpn === 0) {
              return mulCoef
            } else if (divExpn > 0) {
              return mulCoef + '*X^' + divExpn
            }
          }
        }
      }
    }
    for (let i = poly1.length - 1; i >= 0; i--) {
      minExpn = poly1[i].expn < minExpn ? poly1[i].expn : minExpn
    }
    for (let i = poly2.length - 1; i >= 0; i--) {
      minExpn = poly2[i].expn < minExpn ? poly2[i].expn : minExpn
    }
    for (let i = 0, len = poly1.length; i < len; i++) {
      poly1[i].expn -= minExpn
      if (poly1[i].expn !== 0) {
        str += poly1[i].coef + '*X^' + poly1[i].expn + '+'
      } else {
        str += poly1[i].coef + '+'
      }
    }
    str = '( ' + str.slice(0, str.length - 1).replace(/\+-/g, '-') + ' )/('
    for (let i = 0, len = poly2.length; i < len; i++) {
      poly2[i].expn -= minExpn
      if (poly2[i].expn !== 0) {
        str += poly2[i].coef + '*X^' + poly2[i].expn + '+'
      } else {
        str += poly2[i].coef + '+'
      }
    }
    str = str.slice(0, str.length - 1).replace(/\+-/g, '-')
    str += ')'
    return str
  }
  return poly
}
export default {
  data () {
    return {
      poly_a: '',
      poly_b: '',
      result: '暂无'
    }
  },
  computed: {
    poly_1 () {
      return new Poly(this.poly_a)
    },
    poly_2 () {
      return new Poly(this.poly_b)
    }
  },
  methods: {
    addPoly () {
      let poly = this.poly_1.copy().add(this.poly_2.copy())
      let str = ''
      for (let i = 0; i <= poly.length - 1; i++) {
        if (poly[i].coef !== 0) {
          str += poly[i].coef + '*X^' + poly[i].expn + '+'
        }
      }
      this.result = str.slice(0, str.length - 1).replace(/\+-/g, '-')
      if (this.result === '') {
        this.result = '0'
      }
    },
    subPoly () {
      let poly = this.poly_1.copy().sub(this.poly_2.copy())
      let str = ''
      for (let i = 0; i <= poly.length - 1; i++) {
        if (poly[i].coef !== 0) {
          str += poly[i].coef + '*X^' + poly[i].expn + '+'
        }
      }
      this.result = str.slice(0, str.length - 1).replace(/\+-/g, '-')
      if (this.result === '') {
        this.result = '0'
      }
    },
    mulPoly () {
      let poly = this.poly_1.copy().mul(this.poly_2.copy())
      let str = ''
      for (let i = 0; i <= poly.length - 1; i++) {
        if (poly[i].coef !== 0) {
          str += poly[i].coef + '*X^' + poly[i].expn + '+'
        }
      }
      this.result = str.slice(0, str.length - 1).replace(/\+-/g, '-')
      if (this.result === '') {
        this.result = '0'
      }
    },
    divPoly () {
      this.result = this.poly_1.copy().div(this.poly_2.copy())
    }
  }
}
</script>

<style scoped>
#Poly {
  font-size: 30px;
}
.show-view {
  background-color: #adf;
}
.show-data {
  background-color: #fda;
}
.show-data input {
  margin: 10px;
  height: 30px;
  padding: 2px;
  line-height: 28px;
  font-size: 20px;
}
.show-data-example {
  font-size: 18px;
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
  font-size: 17px;
  background-color: #afe;
}
.summary pre {
  text-align: left;
}
</style>
