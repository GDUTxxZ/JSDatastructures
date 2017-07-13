// 一元稀疏多项式
function Poly (polyStr) { // polyStr为形如：6*X^1+5*X^3+28*X^14(系数应降序)的一元稀疏多项式字符串
  let poly = []
  let polyArr = polyStr.replace(/-/g, '+-').split('+') // 处理字符串为数组
  for (let i in polyArr) { // 逐项加入一元稀疏多项式
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
  poly.add = function (anotherPoly) { // 与另一个元稀疏多项式加和，返回一个元稀疏多项式
    let i = poly.length - 1 // 本身长度
    let j = anotherPoly.length - 1 // 另一个的长度
    let newPloy = new Poly()
    while (i >= 0 || j >= 0) { // 从次数较低的项开始插入
      if (i < 0) { // 当本身的插入完成
        while (j >= 0) {
          newPloy.unshift(anotherPoly[j--])
        }
      } else if (j < 0) { // 当另一个元稀疏多项式插入完成
        while (i >= 0) {
          newPloy.unshift(poly[i--])
        }
      } else { // 选择两者中较小的一项，若有相同则一起构成新项
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
  poly.sub = function (anotherPoly) { // 与另一个元稀疏多项式相减，返回一个元稀疏多项式
    for (let i = anotherPoly.length - 1; i >= 0; i--) { // 把另一个多项式的+-逆转，再返回加和值
      anotherPoly[i].coef = 0 - anotherPoly[i].coef
    }
    return poly.add(anotherPoly)
  }
  poly.mul = function (anotherPoly) { // 与另一个元稀疏多项式相乘，返回一个元稀疏多项式
    var newPloy = new Poly()
    for (let i = poly.length - 1; i >= 0; i--) {
      for (let j = anotherPoly.length - 1; j >= 0; j--) {
        let flag = false
        let expn = poly[i].expn + anotherPoly[j].expn // 新产生的指数
        newPloy.forEach((value) => {
          if (value.expn === expn) { // 检测是否合并同类项
            value.coef += poly[i].coef * anotherPoly[j].coef
            flag = true
          }
        })
        if (!flag) {
          newPloy.push({ // 无同类项
            coef: poly[i].coef * anotherPoly[j].coef,
            expn: poly[i].expn + anotherPoly[j].expn
          })
        }
      }
    }
    newPloy.sort((a, b) => { // 排序
      return a.expn - b.expn
    })
    return newPloy
  }
  poly.div = function (anotherPoly) { // 与另一个元稀疏多项式相除，返回一个结果字符串
    let poly1 = poly
    let poly2 = anotherPoly
    let minExpn = poly1[0].expn
    let str = ''
    if (poly1.length === poly2.length) { // 若两者长度相同，则有可能产生一个上下均非一元稀疏多项式的分数
      let mulCoef = poly1[0].coef / poly2[0].coef // 假设最小公因数的系数
      let divExpn = poly1[0].expn - poly2[0].expn // 假设最小公因数的指数
      for (var i = poly1.length - 1; i >= 0; i--) {
        if (!(poly1[i].coef / poly2[i].coef === mulCoef) || !(poly1[i].expn - poly2[i].expn === divExpn)) {
          // 检验能否符合所有的项
          break
        }
        if (i === 0) { // 所有项均符合，分类得出结果
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
          return
        }
      }
    }
    for (let i = poly1.length - 1; i >= 0; i--) { // 找出最小公因数的指数
      minExpn = poly1[i].expn < minExpn ? poly1[i].expn : minExpn
    }
    for (let i = poly2.length - 1; i >= 0; i--) { // 找出最小公因数的指数
      minExpn = poly2[i].expn < minExpn ? poly2[i].expn : minExpn
    }
    // 拼凑字符串得出结果
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