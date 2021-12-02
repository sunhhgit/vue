<template>
  <div class="relative-position box">
    <h6 class="q-my-md">{{ msg }}</h6>
    <div class="absolute-top-right" style="top: 16px;right: 16px">
      <login></login>
    </div>
    <router-link to="/list">跳转列表页</router-link>

    <div class="q-my-md" style="display: flex;flex-direction: row;justify-content: center; align-items: center;">
      <h6>{{phoneNum | phoneFormat | prefix('tel:') | globalSuffix('（隐私保护）')}}</h6>
      <button @click="copyText(phoneNum)">点击复制号码</button>
    </div>
    <hr/>
    <h6 class="q-my-md">minVuex测试</h6>
    <h6>$store.state的内容：{{$store.state}}</h6>
    <h6>$store.getters方式获取信息： 姓名：{{$store.getters.getName}} ；手机：{{$store.getters.getPhone}}</h6>
    <button class="q-ma-md" @click="handleClick">点击更改姓名</button>
    <button @click="syncHandleClick">点击异步(2秒后)更改手机</button>
    <hr/>
    <h6>
      <a style="margin-right: 50px" href="#/routerHash">HashRouter Demo</a>
      <router-link to="/routerHistory">HistoryRouter Demo</router-link>
    </h6>
    <hr/>
    <h6><router-link to="/asyncComponents">异步组件</router-link></h6>
    <hr/>
    <div>vueTree</div>
    <div style="width: 300px;padding: 10px 20px;background: ghostwhite;margin: 10px auto;">
      <vue-tree :options="treeOptions" :value="[8]"></vue-tree>
    </div>
  </div>
</template>

<script>
import login from '../../fragments/login'
import { commonMixins } from '../../mixins/index'
import { phoneFormat, prefix } from '../../filters/index'
import vueTree from '../../components/VueTree/tree'
export default {
  name: 'home',
  mixins: [commonMixins],
  filters: {
    phoneFormat,
    prefix
  },
  components: {
    login,
    vueTree
  },
  data () {
    return {
      msg: 'homePage',
      mixinsName: 'homeMixinsName',
      phoneNum: 13899996666,
      treeOptions: [
        {
          value: 1,
          text: 'no.1'
        },
        {
          value: 2,
          text: 'no.2'
        },
        {
          value: 3,
          text: 'no.3',
          children: [
            {
              value: 4,
              text: 'no.3-1'
            },
            {
              value: 5,
              text: 'no.3-2'
            }
          ]
        },
        {
          value: 6,
          text: 'no.4',
          children: [
            {
              value: 7,
              text: 'no.4-1',
              children: [
                {
                  value: 8,
                  text: 'no.4-1-1'
                },
                {
                  value: 9,
                  text: 'no.4-1-2',
                  children: []
                }
              ]
            }
          ]
        },
        {
          value: 10,
          text: 'no.5'
        },
        {
          value: 11,
          text: 'no.6',
          children: [{
            value: 12,
            text: 'no.6-1'
          }]
        }
      ]
    }
  },
  mounted () {
    // console.log(`PageHome - mixinName => ${this.mixinsName}`)
  },
  methods: {
    handleClick () {
      this.$store.commit('changeName', '王小虎')
    },

    syncHandleClick () {
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
