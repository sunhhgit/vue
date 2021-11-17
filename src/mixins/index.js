
export const commonMixins = {
  name: 'commonMixins',
  data () {
    return {
      mixinsName: 'commonMixins',
      enterTime: '2021/10/15'
    }
  },
  mounted () {
    // console.log(`Mixin - Mounted - ${this.mixinsName}`)
    this.enterTime = Date.now()
  },
  methods: {
    copyText (msg) {
      this.$copyText(msg).then(() =>
        // alert('复制成功')
        `复制内容：${msg}`)
    }
  },
  beforeDestroy () {
    // console.log(`上个页面浏览时间 ${Math.floor((Date.now() - this.enterTime) / 1000)}s`)
  }
}
