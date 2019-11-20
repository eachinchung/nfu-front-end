<template>
  <div id="school_bus">
    <van-nav-bar class="title" title="南苑 Bus"/>

    <van-cell-group title="购买车票" class="group">
      <van-cell size="large" title="南苑->河堤公园" value="¥5" is-link @click="toDate(21)"/>
      <van-cell size="large" title="河堤公园->南苑" value="¥5" is-link @click="toDate(22)"/>
      <van-cell size="large" title="南苑->中大南校区" value="¥20" is-link @click="toDate(13)"/>
      <van-cell size="large" title="中大南校区->南苑" value="¥20" is-link @click="toDate(14)"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell size="large" title="预售订单" is-link/>
      <van-cell size="large" title="刷票订单" is-link/>
      <van-cell size="large" title="待乘车订单" is-link to="/schoolBus/notUsedOrder"/>
    </van-cell-group>
  </div>
</template>

<script>
  import {checkLogin} from "../../network/token";

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    methods: {
      toDate(routeId) {
        this.$store.commit("setRouteId", routeId);
        this.$router.push("/schoolBus/date");
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/common.css";
</style>

