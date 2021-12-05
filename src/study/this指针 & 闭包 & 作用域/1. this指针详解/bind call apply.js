// call
Function.prototype.call = function (context, ...args) {
  // eslint-disable-next-line no-param-reassign
  context = context || window

  const fnSymbol = Symbol('fn')
  context[fnSymbol] = this

  context[fnSymbol](...args)
  delete context[fnSymbol]
}

// apply
Function.prototype.apply = function (context, argsArr) {
  // eslint-disable-next-line no-param-reassign
  context = context || window

  const fnSymbol = Symbol('fn')
  context[fnSymbol] = this

  context[fnSymbol](...argsArr)
  delete context[fnSymbol]
}

// bind
Function.prototype.bind = function (context, ...args) {
  // eslint-disable-next-line no-param-reassign
  context = context || window
  const fnSymbol = Symbol('fn')
  context[fnSymbol] = this

  return function (..._args) {
    // eslint-disable-next-line no-param-reassign
    args = args.concat(_args)

    context[fnSymbol](...args)
    delete context[fnSymbol]
  }
}
