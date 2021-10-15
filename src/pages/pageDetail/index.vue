<template>
    <div class="detail-box">
      <h1>DetailPage</h1>
      <h2>当前详情页{{$route.params.id}}</h2>
      <router-link to="/list">返回列表</router-link>
    </div>
</template>

<script>
export default {
  name: 'detail'
}
</script>

<style scoped>
.detail-box{
  width: 100%;
  overflow: hidden;
}
</style>
