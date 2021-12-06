function v () {
  // eslint-disable-next-line no-use-before-define
  console.log(a)
  // eslint-disable-next-line no-var,vars-on-top
  var a = 1
  console.log(a)

  // eslint-disable-next-line no-redeclare,no-empty-function
  function a () {}
  console.log(a)
  // eslint-disable-next-line no-use-before-define
  console.log(b)
  // eslint-disable-next-line no-var,vars-on-top
  var b = 2
  console.log(b)

  // eslint-disable-next-line no-empty-function,no-redeclare
  function b () {}
  console.log(b)
}
v()


// func a 1 1 fun b 2 2
