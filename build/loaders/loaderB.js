// module.exports = function (content, map, meta) {
//   console.log('This is a loaderB')
//   return content
// }


// pitch可以做正序的逻辑
module.exports.pitch = function () {
  console.log('pitch A')
}

// 异步loader处理方式
module.exports = function (content, map, meta) {
  console.log('loaderBBBB')
  const callback = this.async()
  setTimeout(() => {
    callback(null, content)
  }, 1000)
  return content
}
