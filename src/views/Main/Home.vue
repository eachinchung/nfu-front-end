<template>
  <div>
    <van-nav-bar class="title" :border="false" title="南苑聚合" />

    <div class="home-card">
      <div class="home-version">Beta v0.3.10</div>
      <div class="home-plain">更新日志</div>
      <div class="home-notice">
        2017级 计算机类 适配本学期正在学习的学分<br /><br />
        其他年级专业将在下个版本适配。<br /><br />
        正在学习的学分取自课程表，<br />如果发现课没有被算进去，可以重置课程表。<br />
        如果发现课程未匹配，将在下个版本修复。 <br />
        <br />
        话说新版本已经咕咕咕好久了。。。<br />
        而我也已经将近毕业，突然想起这个项目。<br />
        说不定哪天我有空，全新的版本他就来了～
      </div>
    </div>

    <van-row class="home-cardLinks">
      <van-col span="8" @click="$router.push('/electric/main')">
        <van-icon name="bulb-o" size="22" :style="{ marginBottom: '6px' }" />
        <br />
        电费管理
      </van-col>
      <van-col span="8" @click="$router.push('/credit-pro')">
        <van-icon name="medel-o" size="22" :style="{ marginBottom: '6px' }" />
        <br />
        学分查询
      </van-col>
      <van-col span="8" @click="$router.push('/achievement')">
        <van-icon name="orders-o" size="22" :style="{ marginBottom: '6px' }" />
        <br />
        成绩查询
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { checkLogin } from '@/network/token'
import { Col, Icon, Row } from 'vant'

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
  },
  beforeRouteEnter(to, from, next) {
    checkLogin(to, next)
  },
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
