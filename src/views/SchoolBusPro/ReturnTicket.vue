<template>
  <div>
    <van-nav-bar
      class="title"
      :border="false"
      title="退票"
      left-arrow
      @click-left="$router.push('/school-bus-pro/order/list/waiting-ride')"
    />

    <div v-if="ticketData">

      <van-steps :active="2" class="card">
        <van-step>生成订单</van-step>
        <van-step>待付款</van-step>
        <van-step>生成车票</van-step>
      </van-steps>

      <div class="card">
        <van-cell
          class="cardItem"
          :title="ticketData.route"
          :value="ticketData.date"
        />
        <van-cell
          is-link
          class="cardItem"
          v-for="(item,index) in ticketData.passengerList"
          :title="item.name"
          :value="item.state"
          :label="item.phone"
          :key="item.name"
          @click="returnTicket(index)"
        />
      </div>

      <div class="card">
        <div class="bus-return-plain">
          说明
        </div>
        <div class="bus-return-notice">
          发车前&nbsp;24小时&nbsp;退票无需手续费<br>
          发车前&nbsp;2小时&nbsp;退票收取10%手续费<br>
          发车前&nbsp;2小时内&nbsp;退票收取20%手续费<br>
          发车后不接受退票退费申请
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import {Step, Steps} from "vant";
  import {checkLogin} from "@/network/token";
  import {getTicketId, returnTicket} from "@/network/schoolBusPro";

  export default {
    beforeRouteEnter(to, from, next) {
      if (to.query.orderId == null || to.query.orderId === "") next("/main/school-bus-pro")
      checkLogin(to, next)
    },
    components: {
      [Step.name]: Step,
      [Steps.name]: Steps,
    },
    data() {
      return {
        ticketData: null
      }
    },
    created() {
      init(this)
    },
    methods: {
      returnTicket(ticketIndex) {
        rmTicket(this, ticketIndex)
      }
    }
  }

  // 获取车票信息
  function init(vm) {
    vm.$toast.loading({forbidClick: true, duration: 0})
    getTicketId(vm.$route.query.orderId).then(res => {
      if (res.data.code === "1000") vm.ticketData = res.data.message
      else vm.$notify(res.data.message)
      vm.$toast.clear()
    }).catch(() => {
      vm.$notify("无法连接到服务器")
      vm.$toast.clear()
    })
  }

  function rmTicket(vm, ticketIndex) {
    // 判断车票是否退票
    if (vm.ticketData.passengerList[ticketIndex].state !== '已退票') {

      // 提示加载中
      vm.$toast.loading({forbidClick: true, duration: 0})

      // 发送退票请求
      returnTicket({orderId: vm.$route.query.orderId, ticketId: vm.ticketData.passengerList[ticketIndex].ticketId})
        .then(res => {

          if (res.data.code === "1000") {
            vm.$notify({type: 'primary', message: res.data.message})
            vm.ticketData.passengerList[ticketIndex].state = '已退票'
          } else vm.$notify(res.data.message)

          vm.$toast.clear()
        }).catch(() => {
        vm.$notify('无法连接到服务器')
        vm.$toast.clear()
      })

    } else vm.$notify('该车票已退款')
  }

</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .bus-return-plain {
    padding-top: 15px;
    padding-left: 20px;
    color: #2196f3;
  }

  .bus-return-notice {
    padding: 12px 20px 18px;
    font-size: 14px;
    color: #6e6f71;
  }
</style>