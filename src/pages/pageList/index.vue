<template>
  <div class="list-box">
    <h1>PageList</h1>
    <h1><a href="#/home">返回首页</a></h1>
    <div v-for="item in list" :key="item" class="list-box-item">
      <router-link :to="item">{{ item }}</router-link>
    </div>
  </div>
</template>

<script>
import { commonMixins } from '../../mixins/index'
export default {
  name: 'list',
  mixins: [commonMixins],
  data() {
    return {
      list: [],
      mixinsName: 'pageListMinxinsName'
    }
  },
  mounted() {
    // console.log(`PageList - mixinsName => ${this.mixinsName}`)
    this.$nextTick(() => {
      this.list = new Array(8).fill('')
        .map((item, index) => `detail/${index}`)
    })
  }
}
</script>

<style lang="scss" scoped>
  .list-box {
    width: 100%;
    overflow: hidden;

    &-item {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
    }
  }
</style>
