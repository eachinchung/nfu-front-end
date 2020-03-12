<template>
  <div>
    <van-nav-bar class="title">
      <div slot="title" :style="{flex:1, lineHeight: '46px'}">
        <span class="title-tag title-text">南苑 Bus</span>
        <van-tag class="title-tag" plain>Pro</van-tag>
      </div>
    </van-nav-bar>

    <div class="card">
      <van-cell class="cardItem" title="南苑->河堤公园" value="¥5" is-link @click="toDate(21)"/>
      <van-cell class="cardItem" title="河堤公园->南苑" value="¥5" is-link @click="toDate(22)"/>
      <van-cell class="cardItem" title="南苑->中大南校区" value="¥20" is-link @click="toDate(13)"/>
      <van-cell class="cardItem" title="中大南校区->南苑" value="¥20" is-link @click="toDate(14)"/>
    </div>

    <div class="card">
      <!--      <van-cell class="cardItem" title="刷票订单" is-link/>-->
      <van-cell class="cardItem" title="待付款订单" is-link to="/school-bus-pro/order/list/pending-payment"/>
      <van-cell class="cardItem" title="待乘车订单" is-link to="/school-bus-pro/order/list/waiting-ride"/>
    </div>
  </div>
</template>

<script>
  import {checkLogin} from "../../network/token";
  import {Tag} from "vant";

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    components: {
      [Tag.name]: Tag
    },
    methods: {
      toDate(routeId) {
        this.$store.commit("setRouteId", routeId);
        this.$router.push("/school-bus-pro/date");
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .title-tag {
    vertical-align: middle;
  }

  .title-text {
    margin-right: 8px;
  }
</style>

