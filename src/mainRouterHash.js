import Vue from 'vue'
import App from './App'
import router from './router'
import { HashRouter } from './router/HashRouter'

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



