<template>
  <div>
    <van-nav-bar class="title" title="确认订单" left-arrow @click-left="onClickLeft"/>
  </div>
</template>

<script>
  export default {
    methods: {
      onClickLeft() {
        this.$router.push("/school-bus/schedule");
      }
    }
  }
</script>

<style scoped>

</style>