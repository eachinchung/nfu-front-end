<template>
  <div>
    <van-nav-bar
      class="title"
      title="确认订单"
      left-arrow
      right-text="已付款"
      @click-left="$router.push('/schoolBus/schedule')"
      @click-right="$router.push('/schoolBus/notUsedOrder')"
    />

    <div >
      <van-steps :active="1">
        <van-step>生成订单</van-step>
        <van-step>待付款</van-step>
        <van-step>生成车票</van-step>
      </van-steps>
<!--      <van-cell-group class="group">-->
<!--        <van-cell-->
<!--          :title="$store.state.ticket_data.schedule.station_from_name+' -> '+$store.state.ticket_data.schedule.station_to_name"-->
<!--          :value="$store.state.ticket_data.schedule.start_time"-->
<!--        />-->
<!--        <van-cell-->
<!--          v-for="item in $store.state.ticket_data.passenger"-->
<!--          :title="item.name"-->
<!--          :value="$store.state.ticket_data.schedule.price+'¥'"-->
<!--          :label="item.phone"-->
<!--          :key="item.id"-->
<!--        />-->
<!--      </van-cell-group>-->
<!--      <div :style="{textAlign:'right'}">-->
<!--        <p class="total">合计：{{price}}¥</p>-->
<!--      </div>-->

<!--      <van-row type="flex" justify="center" class="row">-->
<!--        <van-button type="info" class="button" icon="alipay" @click="alipay">手机支付宝付款</van-button>-->
<!--      </van-row>-->
<!--      <van-row type="flex" justify="center">-->
<!--        <van-button type="default" class="button" @click="show=true">支付宝付款码</van-button>-->
<!--      </van-row>-->

<!--      <van-popup v-model="show" close-on-popstate>-->
<!--        <van-image :src="$store.state.ticket_data.data.alipays_qr_url" width="80vw" height="80vw">-->
<!--          <template v-slot:loading>-->
<!--            <van-loading type="spinner" size="20"/>-->
<!--          </template>-->
<!--        </van-image>-->
<!--      </van-popup>-->

    </div>
  </div>
</template>

<script>
  import {checkLogin} from "../../network/token";

  export default {
    beforeRouteEnter(to, from, next) {
      if (to.query.orderId == null) next('/main/schoolBus')
      checkLogin(to, next)
    },
    created() {}
  }

  // export default {
  //   data() {
  //     return {
  //       show: false,
  //       qr: null
  //     }
  //   },
  //   beforeRouteEnter(to, from, next) {
  //     beforeRouteCheck(next, to, init)
  //   },
  //   computed: {
  //     price() {
  //       return this.$store.state.ticket_data.schedule.price * this.$store.state.ticket_data.passenger.length
  //     }
  //   },
  //   methods: {
  //     onClickLeft() {
  //       this.$router.push("/school-bus/schedule");
  //     },
  //     onClickRight() {
  //       this.$router.push("/school-bus/not-used-order");
  //     },
  //     alipay() {
  //       location.href = this.$store.state.ticket_data.data.alipays_url
  //     }
  //   }
  // }
</script>

<style scoped>
  @import "~@/assets/css/common.css";

  .group {
    margin-top: 15px;
    margin-bottom: 0;
  }

  .row {
    margin-bottom: 15px;
  }

  .button {
    width: 90%;
  }

  .total {
    padding: 0 10px 35px;
    color: #6e6f71;
    font-size: 15px;
  }
</style>