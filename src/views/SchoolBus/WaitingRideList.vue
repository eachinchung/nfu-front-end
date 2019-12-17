<template>
  <div>
    <van-nav-bar
      class="title"
      title="待乘车订单"
      left-arrow
      @click-left="$router.push('/main/school-bus')"
    />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <div :class="{ refresh: isRefresh }">
        <div ref="busList">
          <div v-if="list">

            <van-cell-group v-if="list.length===0">
              <van-cell size="large" title="暂无待乘车订单"/>
            </van-cell-group>

            <van-cell-group v-else>

              <van-cell
                v-for="item in list"
                :title="`${item.date} ${item.week} ${item.startTime}`"
                :value="`${item.price}¥`"
                :label="`${item.startFromName} -> ${item.startToName}`"
                :key="item.id"
                value-class="valueClass"
                size="large" is-link
                @click="onClickList(item.id,item.ticketUrl)"
              />

            </van-cell-group>
          </div>
        </div>
      </div>
    </van-pull-refresh>

    <van-popup v-model="show">
      <van-cell-group class="cellGroup">
        <van-cell
          title="电子票"
          size="large"
          clickable
          :url="ticketUrl"
        />
        <van-cell
          title="退票"
          size="large"
          clickable
          @click="onClickReturnTicket"
        />
      </van-cell-group>
    </van-popup>

    <van-popup v-model="returnShow">
      <van-cell-group class="cellGroup">
        <van-cell
          v-for="(item, index) in ticketList"
          :key="item.ticket_id"
          :title="item.name"
          size="large"
          clickable
          @click="returnTicket(index)">

          <span slot="default" v-if="item.code!=='1000'">
            已退款
          </span>

        </van-cell>
      </van-cell-group>
    </van-popup>

  </div>
</template>

<script>

  import {checkLogin} from "../../network/token"
  import {getTicketId, returnTicket, waitingRideOrder} from "../../network/schoolBus"
  import {Popup, PullRefresh} from "vant";

  function initList(vm, res) {
    if (res.data.code === "1000") vm.list = res.data.message
    else vm.$notify(res.data.message)

    // 延时100毫秒，计算车票列表是否高于窗口
    setTimeout(() => {
      vm.isRefresh = window.innerHeight - 71 > vm.$refs.busList.offsetHeight
    }, 100);
  }

  // 抽出退票函数
  function rmTicket(vm, ticketIndex) {
    // 判断车票为未退票
    if (vm.ticketList[ticketIndex].code === '1000') {

      // 提示加载中
      vm.$toast.loading({forbidClick: true, duration: 0})

      // 发送退票请求
      returnTicket({orderId: vm.orderId, ticketId: vm.ticketList[ticketIndex].ticketId})
        .then(res => {

          // 先擦除加载提示
          vm.$toast.clear()

          if (res.data.code === "1000") {
            vm.$notify({type: 'primary', message: res.data.message})
            vm.ticketList[ticketIndex].code = '1001'
          } else vm.$notify(res.data.message)
        })
        .catch(() => {
          vm.$toast.clear()
          vm.$notify('未知错误')
        })

    } else vm.$notify('该车票已退款')
  }

  export default {
    components: {[PullRefresh.name]: PullRefresh, [Popup.name]: Popup},
    data() {
      return {
        list: null,
        show: false,
        orderId: null,
        isLoading: false,
        isRefresh: true,
        ticketList: null,
        returnShow: false,
        ticketUrl: null
      }
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    mounted() {
      // 提示正在加载中
      this.$toast.loading({forbidClick: true, duration: 0})

      // 获取车票列表
      waitingRideOrder()
        .then(res => {
          initList(this, res)
          this.$toast.clear()
        })
        .catch(() => {
          this.$notify("无法连接到服务器")
          this.$toast.clear()
        })

    },
    methods: {
      // 下拉刷新
      onRefresh() {
        waitingRideOrder()
          .then(res => {
            initList(this, res)
            this.isLoading = false
          })
          .catch(() => {
            this.$notify("无法连接到服务器")
            this.isLoading = false
          })
      },
      // 点击车票
      onClickList(orderId, ticketUrl) {
        this.show = true
        this.orderId = orderId
        this.ticketUrl = ticketUrl
      },
      // 点击退票
      onClickReturnTicket() {
        getTicketId(this.orderId)
          .then(res => {
            if (res.data.code === "1000") this.ticketList = res.data.message
            this.show = false
            this.returnShow = true
          })
          .catch(() => this.$notify("无法连接到服务器"))
      },
      // 退票
      returnTicket(ticketIndex) {
        rmTicket(this,ticketIndex)
      }
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/common.css";

  .cellGroup {
    width: 85vw;
  }

  .valueClass {
    color: #F44336;
  }

  .refresh {
    height: calc(100vh - 71px);
  }
</style>