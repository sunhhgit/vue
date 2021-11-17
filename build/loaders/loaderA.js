// module.exports = function (content, map, meta) {
//   console.log('This is a loaderA')
//   return content
// }

// pitch可以做正序的逻辑
module.exports.pitch = function () {
  console.log('pitch A')
}

// 同步loader方式
module.exports = function (content, map, meta) {
  console.log('loaderAAAA')
  this.callback(null, content, map, meta)
}
