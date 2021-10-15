<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      // console.log(to, from)
      this.transitionName = to.meta.depth > from.meta.depth ? 'slide-left' : 'slide-right'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: transform 350ms;
  position: absolute;
  overflow: hidden;
}

.slide-right-enter,
.slide-left-leave-active {
  transform: translate(-100%, 0);
}

.slide-left-enter,
.slide-right-leave-active {
  transform: translate(100%, 0);
}
</style>
