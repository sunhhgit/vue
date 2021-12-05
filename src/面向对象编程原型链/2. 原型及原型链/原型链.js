Object.prototype.name = 'Object'

// eslint-disable-next-line no-empty-function
function Player () {}

Player.prototype.name = 'Player'

const p1 = new Player()

p1.name = 'p1'

console.log(p1.name)

// 删除p1.name
delete p1.name

console.log(p1.name)

delete Player.prototype.name

console.log(p1.name)
