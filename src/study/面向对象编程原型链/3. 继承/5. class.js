class Parent {
  constructor () {
    this.name = 'aaa'
  }

  getName () {
    console.log('getname')
    return this.name
  }
}

class Child extends Parent {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
    super()
  }
}

const p1 = new Child()
console.log('p1.getName()=>', p1.getName())
