<template>
  <div>
    <van-nav-bar
      class="title"
      title="确认订单"
      left-arrow
      right-text="已付款"
      @click-left="$router.push(path)"
      @click-right="$router.push('/school-bus/order/list/waiting-ride')"
    />

    <div v-if="orderData">

      <van-steps :active="1" class="card">
        <van-step>生成订单</van-step>
        <van-step>待付款</van-step>
        <van-step>生成车票</van-step>
      </van-steps>

      <div class="card">
        <van-cell
          class="cardItem"
          :title="orderData.route"
          :value="orderData.date"
        />
        <van-cell
          class="cardItem"
          v-for="item in orderData.passengers"
          :title="item.name"
          :value="`${price}¥`"
          :label="item.phone"
          :key="item.name"
        />
      </div>

      <div class="bus-pay-price">
        <p class="bus-pay-total">合计：{{orderData.price}}¥</p>
      </div>

      <van-row type="flex" justify="center" class="bus-pay-row">
        <van-button type="info" class="bus-pay-button" icon="alipay" @click="alipay">手机支付宝付款</van-button>
      </van-row>
      <van-row type="flex" justify="center">
        <van-button type="default" class="bus-pay-button" @click="show=true">支付宝付款码</van-button>
      </van-row>

      <van-popup v-model="show" close-on-popstate>
        <van-image :src="orderData.alipayQrUrl" width="80vw" height="80vw">
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
      </van-popup>

    </div>
  </div>
</template>

<script>
  import {checkLogin} from "../../network/token";
  import {ordePay} from "../../network/schoolBus";
  import {Button, Col, Image, Loading, Popup, Row, Step, Steps} from "vant";

  export default {
    data() {
      return {
        show: false,
        orderData: null,
        path: null
      }
    },
    computed: {
      price() {
        return this.orderData.price / this.orderData.passengers.length
      }
    },
    components: {
      [Image.name]: Image,
      [Step.name]: Step,
      [Steps.name]: Steps,
      [Loading.name]: Loading,
      [Popup.name]: Popup,
      [Button.name]: Button,
      [Row.name]: Row,
      [Col.name]: Col
    },
    beforeRouteEnter(to, from, next) {
      if (to.query.orderId == null || to.query.orderId === "") next("/main/school-bus")
      checkLogin(to, next)
    },
    created() {
      // 提示正在加载中
      this.$toast.loading({forbidClick: true, duration: 0})

      // 从哪来回哪去
      if (this.$route.query.from == null) this.path = "/main/school-bus"
      else this.path = this.$route.query.from

      ordePay(this.$route.query.orderId).then(res => {
        if (res.data.code === "1000") this.orderData = res.data.message
        else this.$notify(res.data.message)
        this.$toast.clear()
      }).catch(() => {
        this.$notify("无法连接到服务器")
        this.$toast.clear()
      })
    },
    methods: {
      alipay() {
        location.href = this.orderData.alipayUrl
      }
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .bus-pay-row {
    margin-bottom: 15px;
  }

  .bus-pay-button {
    width: 85%;
    border-radius: 5px;
  }

  .bus-pay-price {
    text-align: right;
    margin-right: 10px;
  }

  .bus-pay-total {
    padding: 0 10px 35px;
    color: #6e6f71;
    font-size: 15px;
  }
</style>