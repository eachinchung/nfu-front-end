<template>
  <div>
    <van-nav-bar class="title" title="南苑聚合"/>

    <div class="home-card">
      <div class="home-version">
        beta v0.3.5
      </div>
      <div class="home-plain">
        更新日志
      </div>
      <div class="home-notice">
        性能优化<br>
        <br>
        新版课程表<br>
        开放意见反馈<br>
        性能优化
      </div>
    </div>

    <van-row class="home-cardLinks">
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
  import {getProfile} from "@/network/profile";

  export default {
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Icon.name]: Icon
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    created() {
      getProfile().then()
    }
  }
</script>

<style scoped>

  .home-notice {
    padding: 20px;
    font-size: 14px;
    color: #6e6f71;
  }

  .home-plain {
    padding-top: 15px;
    padding-left: 20px;
    color: #2196f3;
  }

  .home-version {
    float: right;
    padding-top: 15px;
    padding-right: 20px;
    font-size: 14px;
    color: #6e6f71;
  }

  .home-card {
    background: #ffffff;
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .home-cardLinks {
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
