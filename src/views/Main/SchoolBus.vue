<template>
  <div>
    <van-nav-bar class="title" title="南苑 Bus"/>

    <div class="card">
      <van-cell size="large" class="cardItem" title="南苑->河堤公园" value="¥5" is-link @click="toDate(21)"/>
      <van-cell size="large" class="cardItem" title="河堤公园->南苑" value="¥5" is-link @click="toDate(22)"/>
      <van-cell size="large" class="cardItem" title="南苑->中大南校区" value="¥20" is-link @click="toDate(13)"/>
      <van-cell size="large" class="cardItem" title="中大南校区->南苑" value="¥20" is-link @click="toDate(14)"/>
    </div>

    <div class="card">
<!--      <van-cell class="cardItem" title="刷票订单" is-link/>-->
      <van-cell size="large" class="cardItem" title="待付款订单" is-link to="/school-bus/order/list/pending-payment"/>
      <van-cell size="large" class="cardItem" title="待乘车订单" is-link to="/school-bus/order/list/waiting-ride"/>
    </div>
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
        this.$router.push("/school-bus/date");
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/card.css";
</style>

