<script>
import item from './item.vue'
import refs from './refs'

let count = 0
export default {
  name: 'tree',

  // 传递参数
  props: {
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    const name = `v-tree__${++count}`
    return { name }
  },

  // 同步实例状态
  created () {
    // 命名、初始化
    // eslint-disable-next-line prefer-destructuring
    const name = this.name

    // 面向对象注册
    refs.init({ name }, this)
  },
  destroy () {
    // eslint-disable-next-line prefer-destructuring
    const name = this.name

    // 销毁
    refs.destroy(name)
  },
  components: { item },

  // 视图层
  render (h) {
    return (
      <div class="tree">
        <ul class="vue-tree">
          {
            this.options.map((itemData, index) => {
              // console.log('value,name, itemData=>', this.value, this.name, JSON.stringify(itemData))
              return (
                <item name={this.name}
                  option={itemData}
                  value={this.value}
                  key={`${this.name}${itemData.value}${index}`}>
                </item>
              )
            })
          }
        </ul>
      </div>
    )
  }
}
</script>
