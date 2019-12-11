<template>
  <div>
    <van-nav-bar class="title" title="南苑聚合"/>

    <van-panel title="通知" status="2019-12-04" class="group">
      <div class="notice" v-html="notice"/>
    </van-panel>

    <van-cell-group>
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
    },
    data() {
      return {
        notice: '此版本为第一个测试版。<br><br>修改邮箱功能、意见反馈功能预计下学期开放。<br>自定义课表功能等，也将陆续开放。'
      }
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
