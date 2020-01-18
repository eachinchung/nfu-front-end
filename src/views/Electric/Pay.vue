<template>
  <div>
    <van-nav-bar
      class="title"
      title="电费充值"
      left-arrow
      @click-left="$router.push('/electric/main')"
    />

    <div class="card">
      <van-cell
        value="1.5 kW·h"
        title="1¥"
        is-link
        @click="createOrder(1)"
        class="cardItem"
      />
      <van-cell
        value="15 kW·h"
        title="10¥"
        is-link
        @click="createOrder(10)"
        class="cardItem"
      />
      <van-cell
        value="30 kW·h"
        title="20¥"
        is-link
        @click="createOrder(20)"
        class="cardItem"
      />
      <van-cell
        value="75 kW·h"
        title="50¥"
        is-link
        @click="createOrder(50)"
        class="cardItem"
      />
      <van-cell
        value="150 kW·h"
        title="100¥"
        is-link
        @click="createOrder(100)"
        class="cardItem"
      />
      <van-cell
        value="300 kW·h"
        title="200¥"
        is-link
        @click="createOrder(200)"
        class="cardItem"
      />
    </div>

    <div class="card">
      <div class="electric-pay-plain">
        说明
      </div>
      <div class="electric-pay-notice">
        电费充值即时到账。<br>
        学校电费价格参考：¥0.67/kW·h<br>
        学校电费系统每天刷新一次余额，请以实际为准。<br>
        南苑聚合对接学校支付接口，我们不会收取其他费用
      </div>
    </div>

    <van-popup v-model="showPay" close-on-popstate>
      <van-image :src="qrUrl" width="90vw" height="90vw">
        <template v-slot:loading>
          <van-loading type="spinner" size="20"/>
        </template>
      </van-image>
    </van-popup>
  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {createOrder} from "@/network/electric";
  import {Image, Loading, Popup} from "vant";

  export default {
    components: {
      [Image.name]: Image,
      [Loading.name]: Loading,
      [Popup.name]: Popup
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        showPay: false,
        url: null
      }
    },
    computed:{
      qrUrl(){
        return `${process.env.VUE_APP_POST_URL}/electric/wechat-pay/qrcode?url=${this.url}`
      }
    },
    methods: {
      createOrder(amount) {

        this.$notify({type: 'success', message: '因学校服务器反应缓慢，预估需要10秒'});
        this.$toast.loading({message: '正在创建订单', forbidClick: true, duration: 0})

        createOrder({amount}).then(res => {

          if (res.data.code === "1000") {
            this.url = res.data.wechatPay
            this.showPay = true
          } else this.$notify(res.data.message)

          this.$toast.clear()

        }).catch(() => {
          this.$notify("无法连接到服务器")
          this.$toast.clear()
        })

      }
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .electric-pay-plain {
    padding-top: 15px;
    padding-left: 20px;
    color: #2196f3;
  }

  .electric-pay-notice {
    padding: 20px;
    font-size: 14px;
    color: #6e6f71;
  }
</style>