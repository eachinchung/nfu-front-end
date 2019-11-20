<template>
  <div>
    <van-nav-bar class="title" title="南苑聚合"/>
  </div>
</template>

<script>

  import {checkLogin} from "../../../network/token";

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    }
  }
</script>

