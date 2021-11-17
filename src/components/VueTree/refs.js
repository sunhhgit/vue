/*
 * tree对象类
 * 基础能力提供
 */
class Ref {
  constructor (opts, tree) {
    const name = this.name = opts.name

    this.tree = tree
    this.refs = {}
    // eslint-disable-next-line no-use-before-define
    refs[name] = this
  }

  set (vm) {
    this.refs[vm.cid] = vm
  }

  get (cid) {
    return cid ? this.refs[cid] : this.tree
  }
}

/*
 * 面向组件逻辑
 * 一整棵树
 */
const refs = {}

// 初始化工厂生产实例
const init = function (opts, tree) {
  if (!refs[opts.name]) {
    return new Ref(opts, tree)
  }
  return refs[opts.name]
}

// 销毁实例
const destroy = function (name) {
  refs[name] && delete refs[name]
}

// 设置节点
const set = function (name, vm) {
  refs[name] && refs[name].set(vm)
}

// 获取节点
const get = function (name, cid) {
  return refs[name] && refs[name].get(cid)
}

export default {
  init,
  destroy,
  get,
  set
}

