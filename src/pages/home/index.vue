<template>
  <div class="box">
    <h1>{{ msg }}</h1>
    <router-link to="/list">跳转列表页</router-link>

    <h6>{{phoneNum | phoneFormat | prefix('tel:') | globalSuffix('（隐私保护）')}}</h6>

    <button @click="copyText(phoneNum)">点击复制号码</button>
  </div>
</template>

<script>
import { commonMixins } from '../../mixins/index'
import { phoneFormat, prefix } from '../../filters/index'
export default {
  name: 'home',
  mixins: [commonMixins],
  filters: { phoneFormat, prefix },
  data () {
    return {
      msg: 'homePage',
      mixinsName: 'homeMixinsName',
      phoneNum: 13899996666
    }
  },
  mounted() {
    console.log(`PageHome - mixinName => ${this.mixinsName}`)
  }
}
</script>

<style scoped>
  .box{
    width: 100%;
    overflow: hidden;
  }
</style>
