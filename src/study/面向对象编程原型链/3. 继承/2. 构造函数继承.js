function Parent (name, color) {
  this.name = name
  this.color = color
  this.actions = ['sing', 'jump', 'rap']
  // eslint-disable-next-line no-empty-function
  this.eat = function () {}
}

function Child () {
  // eslint-disable-next-line prefer-rest-params
  Parent.apply(this, arguments)
}

const c1 = new Child('c1', 'red')
c1.actions.push('basketball')
console.log('c1 color=>', c1.color, c1.actions)
const c2 = new Child('c2', 'white')
console.log('c2 color=>', c2.color, c2.actions)

console.log(c1.eat === c2.eat)
