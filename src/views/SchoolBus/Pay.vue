<template>
  <div>
    <van-nav-bar
      class="title"
      title="确认订单"
      left-arrow
      right-text="已付款"
      @click-left="$router.push(path)"
      @click-right="$router.push('/schoolBus/notUsedOrder')"
    />

    <div v-if="ordeData">
      <van-steps :active="1">
        <van-step>生成订单</van-step>
        <van-step>待付款</van-step>
        <van-step>生成车票</van-step>
      </van-steps>
      <van-cell-group class="group">
        <van-cell
          :title="ordeData.route"
          :value="ordeData.date"
        />
        <van-cell
          v-for="item in ordeData.passengers"
          :title="item.name"
          :value="`${price}¥`"
          :label="item.phone"
          :key="item.name"
        />
      </van-cell-group>

      <div :style="{textAlign:'right'}">
        <p class="total">合计：{{ordeData.price}}¥</p>
      </div>

      <van-row type="flex" justify="center" class="row">
        <van-button type="info" class="button" icon="alipay" @click="alipay">手机支付宝付款</van-button>
      </van-row>
      <van-row type="flex" justify="center">
        <van-button type="default" class="button" @click="show=true">支付宝付款码</van-button>
      </van-row>

      <van-popup v-model="show" close-on-popstate>
        <van-image :src="ordeData.alipayQrUrl" width="80vw" height="80vw">
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

  export default {
    data() {
      return {
        show: false,
        ordeData: null,
        path: null
      }
    },
    computed: {
      price() {
        return this.ordeData.price / this.ordeData.passengers.length
      }
    },
    beforeRouteEnter(to, from, next) {
      if (to.query.orderId == null || to.query.orderId === "") next("/main/schoolBus")
      checkLogin(to, next)
    },
    created() {
      // 提示正在加载中
      this.$toast.loading({forbidClick: true, duration: 0})

      // 从哪来回哪去
      if (this.$route.query.from == null) this.path = "/main/schoolBus"
      else this.path = this.$route.query.from

      ordePay(this.$route.query.orderId).then(res => {
        if (res.data.code === "1000") this.ordeData = res.data.message
        else this.$notify(res.data.message)
        this.$toast.clear()
      }).catch(() => {
        this.$notify('未知错误')
        this.$toast.clear()
      })
    },
    methods: {
      alipay() {
        location.href = this.ordeData.alipayUrl
      }
    }
  }
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