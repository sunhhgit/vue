import { HistoryRouter } from './router/HistoryRouter'

const Router = new HistoryRouter()
// console.log('location.pathname=>', location.pathname)
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
    // console.log(e.target)
    if (e.target.tagName === 'A') {
      e.preventDefault()
      Router.go(e.target.getAttribute('href'))
    }
  })
}

