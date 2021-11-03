export class HashRouter {
  constructor () {
    // 存储hash与callback键值对
    this.routes = {}
    // 保存当前的hash
    this.currentHash = ''

    // 绑定事件
    const hashChangeUrl = this.hashChangeUrl.bind(this)

    // 页面加载事件
    window.addEventListener('load', hashChangeUrl, false)
    // 监听hashchange事件
    window.addEventListener('hashchange', hashChangeUrl, false)
  }

  // path路径和callback函数对应起来，并且使用 上面的this.routes存储起来
  route (path, callback) {
    // eslint-disable-next-line no-empty-function
    this.routes[path] = callback || function () {}
  }

  hashChangeUrl () {

    /*
     * 获取当前的hash值
     * location.hash 获取的值为："#/a, 因此 location.hash.slice(1) = '/a' 这样的
     */
    console.log('hashChangeUrl', this.currentHash)
    this.currentHash = location.hash.slice(1) || '/'
    // 执行当前hash对应的callback函数
    this.routes[this.currentHash] && this.routes[this.currentHash]()
  }
}
