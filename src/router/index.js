import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import = require('./_import')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => _import('home'),
      meta: {
        deep: 1
      }
    },
    {
      path: '/list',
      name: 'list',
      component: () => _import('pageList'),
      meta: {
        deep: 2
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => _import('pageDetail'),
      meta: {
        deep: 3
      }
    }
  ]
})
