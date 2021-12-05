/*
 * 原型链继承 + 构造函数继承
 * 1. 引用类型被改变，所有实例共享
 * 2. 无法传参
 * 3. 多占用了内存空间
 */

function Parent (name, actions) {
  this.name = name
  this.actions = actions
}

Parent.prototype.getName = function () {
  console.log(`${this.name}调用了getName`)
}

function Child () {
  // eslint-disable-next-line prefer-rest-params
  Parent.apply(this, arguments)
}

// Child.prototype = Parent.prototype; // 一旦更改Child.prototype，Parent.prototype也会被修改。
Child.prototype = Object.create(Parent.prototype)

/*
 * Child.prototype = new Parent();
 * let TempFunction = function () {};
 * TempFunction.prototype = Parent.prototype;
 * Child.prototype = new TempFunction();
 */

Child.prototype.constructor = Child


// super() Child

const c1 = new Child('c1', ['eat'])
console.log('c1 actions=>', c1.actions, c1.getName())
const c2 = new Child('c2', ['run'])
console.log('c2 actions=>', c2.actions, c2.getName())
console.log('c2 c1.getName === c2.getName ? =>', c1.getName === c2.getName)
