<template>
  <div>
    <van-nav-bar class="title" title="南苑聚合"/>

    <van-panel title="更新日志" status="bate v0.1.2" class="group">
      <div class="notice">
        开放电费管理功能。<br><br>
        目前学校电费数据停止更新，故电费不是实时数据。<br>
        电费充值功能近期会开放。
      </div>
    </van-panel>

    <van-cell-group>
      <van-cell
        size="large"
        icon="bulb-o"
        title="电费管理"
        to="/electric/main"
        is-link
      />
      <van-cell
        size="large"
        icon="medel-o"
        title="学分管理"
        to="/credit"
        is-link
      />
      <van-cell
        size="large"
        icon="orders-o"
        title="成绩查询"
        to="/achievement"
        is-link
      />
    </van-cell-group>

  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/common.css";

  .notice {
    padding: 20px;
    font-size: 14px;
    color: #6e6f71;
  }
</style>
