<script>
import refs from './refs'
let count = 0

export default {
  name: 'item',
  data () {
    const cid = this.cid || (`item${++count}`)
    return {
      level: (this.$parent.level || 0) + 1, // 当前节点的层级
      indent: 10, // 缩进单位
      expand: false,
      checked: false,
      cid
    }
  },
  props: {
    name: String,
    option: Object,
    value: Array
  },
  computed: {
    // ===是否有子节点
    isFolder () {
      return !!this.option.children
    }
  },
  mounted () {
    // 初始化
    // eslint-disable-next-line prefer-destructuring
    const name = this.name

    // 创建节点
    refs.set(name, this)

    // 恢复初始状态
    this.setDefault()
  },
  methods: {
    handleClickExpand () {
      this.expand = !this.expand
    },
    handleClickItem () {
      this.checked = !this.checked
    },
    setDefault () {
      // 方法一：直接获取tree节点
      const tree = refs.get(this.name)

      /*
       * 方法二：传入value，获取当前节点
       * let node = refs.get(this.name, this.cid);
       */
      const _value = tree.value

      // node操作

      // 恢复勾选
      if (_value.indexOf(this.option.value) > -1) {
        this.checked = true
      }
    }
  },
  render (h) {
    return (
      <li class={['tree_item', 'q-py-xs', this.checked && 'is-checked']}>
        {/* 展开箭头 */}
        <div class={['arrow', this.expand ? 'expand' : '']}
          style={{ display: this.isFolder ? 'block' : 'none',
            marginLeft: this.level !== 0 && (`${(this.level - 1) * this.indent + Math.sqrt(9 * 9 * 2) * (this.level - 1)}px`) }}
          onClick={this.handleClickExpand}>
        </div>

        {/* 展示标题 */}
        <a class={['v-tree__title']}
          style={{ paddingLeft: this.level !== 0 && (`${this.level * this.indent + Math.sqrt(9 * 9 * 2) * (this.level - 1)}px`) }}
          onClick={this.handleClickItem}>
          { this.option.text }
        </a>

        {/* 子节点嵌套 */}
        {
          this.isFolder
            && <ul style={{ display: this.expand ? 'block' : 'none' }}>
              {
                this.option.children.map((itemData, index) => (
                  <item name={this.name}
                    option={itemData}
                    value={this.value}
                    key={`${this.name}${itemData.value}${index}`}>
                  </item>
                ))
              }
            </ul>
        }
      </li>
    )
  }
}
</script>
<style scoped>
  .tree_item {
    text-align: left;
    cursor: pointer;
  }
  li {
    position: relative;
  }
  .v-tree__title {
    margin-left: 10px;
    /*margin: 5px;*/
  }
  .arrow {
    position: absolute;
    /*left: -10px;*/
    /*top: 10px;*/
    margin-top: 2px;
    width: 8px;
    height: 8px;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    transform: rotate(-135deg);
  }
  .expand {
    transform: rotate(45deg);
    margin-top: 8px;
  }
  .is-checked {
    color: blue;
  }
  ul, li {
    list-style: none;
  }
</style>
