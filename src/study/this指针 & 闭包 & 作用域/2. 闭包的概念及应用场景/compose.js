// 实现一个compose函数, 用法如下:
function fn1 (x) {
  return x + 1
}

function fn2 (x) {
  return x + 2
}

function fn3 (x) {
  return x + 3
}

function fn4 (x) {
  return x + 4
}


// eslint-disable-next-line no-use-before-define
const a = compose(fn1, fn2, fn3, fn4)
console.log(a(1)) // 1+4+3+2+1=11


// 解答

function compose () {
  // eslint-disable-next-line prefer-rest-params
  const argFnList = [...arguments]

  return num => argFnList.reduce((pre, cur) => cur(pre), num)
}
