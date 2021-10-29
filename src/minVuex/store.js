import { ModuleCollection } from './ModuleCollection'
import { forEachValue } from '../utils/index'

// eslint-disable-next-line init-declarations,no-underscore-dangle
let _Vue

/*
 * vue 插件必须要这个 install 函数 实现this.$store全局访问
 * 在Vue.use(vuex)的过程中会调用vuex的install方法，同时把Vue作为形参传入，
 * 通过Vue.mixin给所有的组件添加生命周期事件，先给根组件设置this.$store = this.$options.store,然后让所有子组件继承
 */
const install = v => {
  // 拿到 Vue 的构造器，存起来
  _Vue = v
  // 通过 mixin 注入到每一个vue实例 👉 https://cn.vuejs.org/v2/guide/mixins.html
  _Vue.mixin({
    beforeCreate () {

      const options = this.$options
      // 这样就可以通过 this.$store 访问到 Vuex 实例，拿到 store 了
      if (options.store) {
        this.$store = typeof options.store === 'function'
          ? options.store()
          : options.store
      } else if (options.parent && options.parent.$store) {
        this.$store = options.parent.$store
      }
    }
  })
}

const installModule = (store, state, path, root) => {
  // 把所有数据放到state上
  if (path.length) {
    // 获取父模块 示例：['b','c'] => rootState['b']
    const parent = path.slice(0, -1).reduce((module, item) => module[item], state)
    // rootState['b']['c'] = rawModule.state
    _Vue.set(parent, path[path.length - 1], root.state)
  }
  // getters 对所有模块的getters进行劫持，直接使用$store.getters访问，限制就是模块之间命名不能重复
  const { getters, mutations, actions } = root._rawModule
  if (getters) {
    forEachValue(getters, (key, value) => {
      Object.defineProperty(store.getters, key, {
        get: () => value(root.state)
      })
    })
  }

  /*
   * mutations 将所有模块的mutations成员放到store.mutations对象上去，然后根据名称划分为多个订阅数组，
   * commit调用时就可以直接触发所有模块执行同名的函数，actions区别在于传回的第一个参数时store,
   * 这样做的原因是实现actions到达事件后可以调用mutations成员执行操作
   */
  if (mutations) {
    forEachValue(mutations, (mutationName, value) => {
      // 收集所有模块的同名mutation
      const _mutations = store.mutations[mutationName] || (store.mutations[mutationName] = [])
      _mutations.push((...payload) => {
        value(root.state, ...payload)
      })
    })
  }

  // actions
  if (actions) {
    forEachValue(actions, (actionName, value) => {
      const _actions = store.actions[actionName] || (store.actions[actionName] = [])
      _actions.push((...payload) => {
        value(store, ...payload)
      })
    })
  }

  // 遍历子模块
  if (root._children) {
    forEachValue(root._children, (name, value) => {
      installModule(store, state, path.concat(name), value)
    })
  }
}

class Store {
  constructor (options) {
    this._vm = new _Vue({ data: { state: options.state } })

    // 我们用 getters 来收集衍生数据 computed\
    this.getters = {}

    // 定义的行为，分别对应异步和同步行为处理
    this.actions = {}
    this.mutations = {}

    // 所有的 modules 注册进来
    this._modules = new ModuleCollection(options)

    /*
     * 但是这些 modules 中的 actions, mutations, getters 都没有注册，所以我们原来的方法要重新写一下
     * 递归的去注册一下就行了，这里抽离一个方法出来实现
     */
    installModule(this, this.state, [], this._modules.root)
  }

  // 暴露state
  get state () {
    return this._vm.state
  }

  commit = (key, ...payload) => {
    this.mutations[key].forEach(fn => fn(...payload))
  }

  dispatch = (key, ...payload) => {
    this.actions[key].forEach(fn => fn(...payload))
  }

  registerModule(moduleName, module) {
    // 注册模块
    this._modules.register([moduleName], module) // (path,rootModule)
    // 格式化后的模块
    const rawModule = this._modules.root._children[moduleName]
    installModule(this, this.state, [moduleName], rawModule)
  }
}

export default {
  install,
  Store
}
