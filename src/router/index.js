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
        depth: 1
      }
    },
    {
      path: '/list',
      name: 'list',
      component: () => _import('pageList'),
      meta: {
        depth: 2
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => _import('pageDetail'),
      meta: {
        depth: 3
      }
    },
    {
      path: '/routerHash',
      name: 'routerHash',
      component: () => _import('routerHash'),
      meta: {
        depth: 4
      }
    },
    {
      path: '/routerHistory',
      name: 'routerHistory',
      component: () => _import('routerHistory'),
      meta: {
        depth: 5
      }
    }
  ]
})
