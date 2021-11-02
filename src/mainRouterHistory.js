class HistoryRoutes {
  constructor () {
    // 保存对应键和函数
    this.routes = {}

    // 监听popstate事件
    window.addEventListener('popstate', e => {
      console.log('popstate')
      const path = this.getState()
      this.routes[path] && this.routes[path]()
    })
  }

  // 获取路由路径
  getState () {
    const path = window.location.pathname
    return path ? path : '/'
  }

  // path路径和callback函数对应起来
  route (path, callback) {
    // eslint-disable-next-line no-empty-function
    this.routes[path] = callback || function () {}
  }


  /*
   * init(path) {
   *   history.replaceState(null, null, path);
   *   this.routes[path] && this.routes[path]();
   * }
   */
  go (path) {
    // 压入浏览历史对象
    history.pushState(null, null, path)

    /*
     * 修改页面内容
     * this.routes[path] && this.routes[path]();
     */
    this.routes[path]()
  }
}

const Router = new HistoryRoutes()
console.log('location.pathname=>', location.pathname)
// Router.init(location.pathname);

const changeColor = function (color) {
  document.querySelector('body').style.backgroundColor = color
}
// 注册函数
Router.route('/', () => {
  changeColor('#f0f0f0')
})
Router.route('/a', () => {
  changeColor('#7f90e0')
})
Router.route('/b', () => {
  changeColor('#CDDC39')
})

const ul = document.querySelector('ul')
if (ul) {
  // 路由的劫持，A标签默认执行router.go方法
  ul.addEventListener('click', e => {
    console.log(e.target)
    if (e.target.tagName === 'A') {
      e.preventDefault()
      Router.go(e.target.getAttribute('href'))
    }
  })
}

