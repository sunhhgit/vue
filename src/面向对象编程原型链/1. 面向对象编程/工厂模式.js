function createPlayer (color) {
  // eslint-disable-next-line no-new-object
  const Player = new Object()
  Player.color = color
  Player.start = function () {
    console.log('下棋')
  }
  return Player
}
const red = createPlayer('red')

console.log(red)
console.log(red.constructor)
