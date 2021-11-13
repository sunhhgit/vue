<template>
  <div class="relative-position full-width flex-column login-box">
    <div>你好，{{user.name}}</div>
    <div>登录Id: {{user.uid}}</div>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'login',
  data() {
    return {
      user: {
        uid: '',
        name: '请登录'
      }
    }
  },
  mounted () {
    this.autoLogin()
  },
  methods: {
    autoLogin() {
      // 自动登录
      this.$ajax.post('/api/users/login').then(res => {
        if (res.code === 200) {
          this.user = res.data
          // 获取登录态
          store.dispatch('main/updateUser', this.user)
          console.log('autoLogin user', this.user)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box{
  text-align: right;
}
</style>
