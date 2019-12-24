<template>
  <div>
    <van-nav-bar class="title" title="南苑聚合"/>

    <div class="card">
      <div class="version">
        beta v0.2.0
      </div>
      <div class="plain">
        更新日志
      </div>
      <div class="notice">
        电费充值功能已开放。<br>
        目前学校电费数据停止更新，故电费不是实时数据。<br>
        <br>
        美化学分查询、成绩查询 UI，增加课程详细类别。<br>
        学分查询页面、成绩查询页面，下拉刷新缓存。<br>
        <br>
        性能优化
      </div>
    </div>

    <van-row class="cardLinks">
      <van-col span="8" @click="$router.push('/electric/main')">
        <van-icon name="bulb-o" size="22" :style="{marginBottom: '6px'}"/>
        <br>
        电费管理
      </van-col>
      <van-col span="8" @click="$router.push('/credit')">
        <van-icon name="medel-o" size="22" :style="{marginBottom: '6px'}"/>
        <br>
        学分查询
      </van-col>
      <van-col span="8" @click="$router.push('/achievement')">
        <van-icon name="orders-o" size="22" :style="{marginBottom: '6px'}"/>
        <br>
        成绩查询
      </van-col>
    </van-row>

  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {Col, Icon, Row} from "vant";

  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    }
  }
</script>

<style scoped>

  .notice {
    padding: 20px;
    font-size: 14px;
    color: #6e6f71;
  }

  .plain {
    padding-top: 15px;
    padding-left: 20px;
    color: #2196f3;
  }

  .version{
    float: right;
    padding-top: 15px;
    padding-right: 20px;
    font-size: 14px;
    color: #6e6f71;
  }

  .card {
    background: #ffffff;
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .cardLinks {
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 12px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    color: #6e6f71;
  }
</style>
