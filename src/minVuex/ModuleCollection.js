import { forEachValue } from '../utils/index'

// ModuleColeection每次调用register方法都会创建一个对象rawModule,
// 将每个模块的所有内容放到_raw中，将state数据放到state中，用_children来模块的直接子模块，
// 第一次调用register时将options转化成的rawModule赋给this.root

export class ModuleCollection {
  constructor (options = {}) {
    this.register([], options)
  }

  register (path, rootModule) {
    // 创建当前模块的格式化对象
    const rawModule = {
      _rawModule: rootModule,
      _children: {},
      state: rootModule.state
    }
    // 若还没有根，第一次进入，则给根模块赋值
    if (!this.root) {
      this.root = rawModule
    } else {
      // 找到当前模块父模块 [b,c] => this.root._children['b']
      const parent = path.slice(0, -1).reduce((module, item) => module._children[item], this.root)
      // 示例：this.root._children['b']._children['c']=rawModule
      parent._children[path[path.length - 1]] = rawModule
    }

    /* 遍历注册子模块 */
    if (rootModule.modules) {
      forEachValue(rootModule.modules, (moduleName, module) => {
        // path.concat的作用是记录路径，用于找到父模块，将自身放到父模块的_children对象中，形成图中格式,
        // 例如下面代码：在不是根模块的情况下，register传入的path=['b','c']时，就可以推断c模块属于第三层，通过前面的b找到父模块，再将自己放到父模块的_children对象
        this.register(path.concat(moduleName), module)
      })
    }
  }
}
