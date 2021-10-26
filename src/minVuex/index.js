import ModulesCollection from './modules'
// eslint-disable-next-line init-declarations
let _Vue

const installModules = (store, state, rootModules, path) => {
  const { getters, mutations, actions } = rootModules._rawModule
  // 处理 getters mutations actions
  if (getters) {
    Object.keys(getters).forEach(key => {
      Object.defineProperty(store.getters, key, {
        get () {
          return getters[key](rootModules.state)
        }
      })
    })
  }

  if (mutations) {
    Object.keys(mutations).forEach(mutationName => {
      const storeMutations = store.mutations[mutationName] || []
      storeMutations.push(payload => {
        // store调用 mutations[mutationName] 的方法来执行,入参 rootModules.state, payload
        mutations[mutationName].call(store, rootModules.state, payload)
      })
      store.mutations[mutationName] = storeMutations
    })
  }

  if (actions) {
    // console.log('actions =>', actions)
    Object.keys(actions).forEach(actionName => {
      const storeActions = store.actions[actionName] || []
      storeActions.push(payload => {
        // action 专注于处理异步，这里传入 this，这样就可以在异步里面通过 commit 触发 mutation 同步数据变化了
        console.log('actions store rootModules payload=>', store, rootModules, actionName, payload)
        // store调用actions[actionName]的方法来执行,入参rootModules, payload
        actions[actionName].call(store, store, payload)
      })
      store.actions[actionName] = storeActions
    })
  }

  if (rootModules._children) {
    Object.keys(rootModules._children).forEach(key => {
      installModules(store, rootModules.state, rootModules._children[key], path.concat(name))
    })
  }
}

class Store {
  constructor (options) {
    const { state = {} } = options
    this._state = new _Vue({ data: { state } })

    this.getters = {}
    this.mutations = {}
    this.actions = {}

    // 解析模块层次
    this.modules = new ModulesCollection(options)
    // 注册对应的模块
    installModules(this, this.state, this.modules.root, [])
  }

  // 暴露state
  get state () {
    return this._state.state
  }

  commit (mutationName, payload) {
    // console.log('this.mutations=>', this.mutations)
    this.mutations[mutationName].forEach(mutation => {
      mutation(payload)
    })
  }

  dispatch (actionName, payload) {
    this.actions[actionName].forEach(action => {
      action(payload)
    })
  }

}

// 插件的install 函数
const install = v => {
  _Vue = v
  v.mixin({
    beforeCreate () {
      const { store = '' } = this.$options
      if (store) {
        this.$store = store
      } else {
        this.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default {
  install,
  Store
}
