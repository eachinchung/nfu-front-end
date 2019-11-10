<template>
  <div>
    <van-nav-bar class="title" title="南苑聚合"/>
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
  }
</script>

<style>

</style>
