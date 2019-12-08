<template>
  <div>
    <van-nav-bar class="title" title="南苑聚合"/>

    <van-cell-group  class="group">
      <van-cell
        size="large"
        icon="bulb-o"
        title="电费管理"
        @click="$toast('该功能正在开发中')"
        is-link
      />
      <van-cell
        size="large"
        icon="medel-o"
        title="学分管理"
        @click="$toast('该功能正在开发中')"
        is-link
      />
      <van-cell
        size="large"
        icon="orders-o"
        title="成绩查询"
        @click="$toast('该功能正在开发中')"
        is-link
      />
    </van-cell-group>

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

<style scoped>
  @import "~@/assets/css/common.css";
</style>
