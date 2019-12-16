<template>
  <div>
    <van-nav-bar
      class="title"
      title="电费管理"
      left-arrow
      @click-left="$router.push('/main/home')"
    />


  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {getElectric} from "@/network/electric";

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    created() {
      getElectric().then(res => {
        console.log(res);
      })
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/common.css";
</style>