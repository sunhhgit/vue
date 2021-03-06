// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 网络层
import './shared/ajax'

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.filter('globalSuffix', (msg, suf) => msg + suf || '')

// 引入自定义的vuex
import minVuex from './minVuex/store'
Vue.use(minVuex)

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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
