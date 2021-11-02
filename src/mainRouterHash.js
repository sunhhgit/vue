// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入自定义的vuex
import minVuex from './minVuex/store'
Vue.use(minVuex)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.filter('globalSuffix', (msg, suf) => msg + suf || '')

Vue.config.productionTip = false

const store = new minVuex.Store({
  state: {
    name: '张三',
    tel: '1389996666'
  },
  getters: {
    getName(state) {
      return state.name
    },
    getPhone(state) {
      return state.tel
    }
  },
  mutations: {
    changeName(state, payload) {
      state.name = payload
    },
    changeTel(state, payload) {
      state.tel = payload
    }
  },
  actions: {
    syncChangeTel({ commit }, payload) {
      setTimeout(() => {
        commit('changeTel', payload)
      }, 2000)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})


class HashRouter {
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
    console.log('hashChangeUrl')
    this.currentHash = location.hash.slice(1) || '/'
    // 执行当前hash对应的callback函数
    this.routes[this.currentHash] && this.routes[this.currentHash]()
  }
}
// 初始化
const Router = new HashRouter()
const changeColor = color => {
  document.querySelector('body').style.backgroundColor = color
}
// 注册函数
Router.route('/home', () => {
  changeColor('#f0f0f0')
})
Router.route('/routerHash', () => {
  changeColor('#7f90e0')
})
Router.route('/list', () => {
  changeColor('#CDDC39')
})



