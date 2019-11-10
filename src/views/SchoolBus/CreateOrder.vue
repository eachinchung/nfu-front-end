<template>
  <div>
    <van-nav-bar class="title" title="确认订单" left-arrow @click-left="onClickLeft"/>
  </div>
</template>

<script>
  import {beforeRouteCheck} from "@/network/refresh_token";

  function init() {

  }

  export default {
    beforeRouteEnter(to, from, next) {
      beforeRouteCheck(next, to, init)
    },
    methods: {
      onClickLeft() {
        this.$router.push("/school_bus/schedule");
      }
    }
  }
</script>

<style scoped>

</style>