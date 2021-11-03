<template>
  <div class="box">
    <h2>{{ msg }}</h2>
    <router-link to="/list">跳转列表页</router-link>

    <div style="display: flex;flex-direction: row;justify-content: center; align-items: center;">
      <h6>{{phoneNum | phoneFormat | prefix('tel:') | globalSuffix('（隐私保护）')}}</h6>
      <button @click="copyText(phoneNum)">点击复制号码</button>
    </div>
    <hr/>
    <h6>minVuex测试</h6>
    <h6>$store.state的内容：{{$store.state}}</h6>
    <h6>$store.getters方式获取信息： 姓名：{{$store.getters.getName}} ；手机：{{$store.getters.getPhone}}</h6>
    <button @click="handleClick">点击更改姓名</button>
    <button @click="syncHandleClick">点击异步(2秒后)更改手机</button>
    <hr/>
    <h6>
      <a style="margin-right: 50px" href="#/routerHash">HashRouter Demo</a>
      <router-link to="/routerHistory">HistoryRouter Demo</router-link>
    </h6>
    <hr/>
    <h6><router-link to="/asyncComponents">异步组件</router-link></h6>
  </div>
</template>

<script>
import { commonMixins } from '../../mixins/index'
import { phoneFormat, prefix } from '../../filters/index'
export default {
  name: 'home',
  mixins: [commonMixins],
  filters: {
    phoneFormat,
    prefix
  },
  data () {
    return {
      msg: 'homePage',
      mixinsName: 'homeMixinsName',
      phoneNum: 13899996666
    }
  },
  mounted () {
    console.log(`PageHome - mixinName => ${this.mixinsName}`)
  },
  methods: {
    handleClick() {
      this.$store.commit('changeName', '王小虎')
    },

    syncHandleClick() {
      this.$store.dispatch('syncChangeTel', '13912345678')
    }
  }
}
</script>

<style scoped>
  .box{
    width: 100%;
    overflow: hidden;
  }
</style>
