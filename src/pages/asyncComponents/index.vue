<template>
  <div>
    <div v-if="showAsyncCom" style="height: 200px;display: flex;flex-direction: column;justify-content: space-around;">
      <async1></async1>
      <async2></async2>
      <async3></async3>
      <async-example></async-example>
      <async-webpack-example></async-webpack-example>
      <async-webpack-example1></async-webpack-example1>
    </div>
    <button @click="toggle">加载组件</button>
  </div>
</template>

<script>
import Vue from 'vue'
const async1 = () => import(/* webpackChunkName: 'async1' */ '../../components/async1.vue')

Vue.component('async2', () => import('../../components/async2.vue'))

Vue.component('async-example', (resolve, reject) => {
  setTimeout(() => {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async 3s later!</div>'
    })
  }, 3000)
})

Vue.component('async-webpack-example', (resolve, reject) => {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['../../components/async4.vue'], resolve)
})

Vue.component(
  'async-webpack-example1',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import(/* webpackChunkName: 'async-webpack-example1' */ '../../components/async5.vue')
)


export default {
  name: 'async-components',
  components: {
    async1,
    async3: () => ({
      component: import(/* webpackChunkName: 'async3' */'../../components/async3.vue'),
      // loading: Loading,
      // error: SadFaceComponent,
      // Delay before showing the loading component. Default: 200ms.
      // 展示加载组件的延时时间。默认值是 200 (毫秒)
      delay: 0,
      timeout: 5000
    })
  },
  data() {
    return {
      showAsyncCom: false
    }
  },
  methods: {
    toggle() {
      this.showAsyncCom = true
    }
  }
}
</script>

<style scoped>

</style>
