<template>
  <div>
    <van-nav-bar class="title" title="确认订单" left-arrow @click-left="onClickLeft"/>
  </div>
</template>

<script>
  export default {
    name: "BrushTicket",
    methods: {
      onClickLeft() {
        this.$router.push("/school_bus/date");
      }
    }
  }
</script>

<style scoped>

</style>