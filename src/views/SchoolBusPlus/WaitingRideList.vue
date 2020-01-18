<template>
  <div>
    <van-nav-bar
      class="title"
      title="待乘车订单"
      left-arrow
      @click-left="$router.push('/main/school-bus-plus')"
    />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <div :class="{ refresh: isRefresh }">
        <div ref="busList">
          <div v-if="list">

            <div class="card" v-if="list.length===0">
              <van-cell class="cardItem" size="large" title="暂无待乘车订单" :style="{color:'#6e6f71'}"/>
            </div>

            <div class="card" v-else>
              <van-cell
                class="cardItem"
                v-for="item in list"
                :title="`${item.date} ${item.week} ${item.startTime}`"
                :value="`${item.price}¥`"
                :label="`${item.startFromName} -> ${item.startToName}`"
                :key="item.id"
                value-class="valueClass"
                is-link
                @click="onClickList(item.id,item.ticketUrl)"
              />
            </div>

          </div>
        </div>
      </div>
    </van-pull-refresh>

    <van-action-sheet
      v-model="showActions"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
    />

  </div>
</template>

<script>
  import {checkLogin} from "@/network/token"
  import {waitingRideOrder} from "@/network/schoolBusPlus"
  import {ActionSheet, PullRefresh} from "vant";


  export default {
    components: {
      [PullRefresh.name]: PullRefresh,
      [ActionSheet.name]: ActionSheet,
    },
    data() {
      return {
        list: null,
        orderId: null,
        isLoading: false,
        isRefresh: true,
        ticketUrl: null,

        showActions: false,
        actions: [
          {name: '电子票'},
          {name: '退票'}
        ]
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
        this.showActions = true
        this.orderId = orderId
        this.ticketUrl = ticketUrl
      },
      onSelect(item) {
        if (item.name === '电子票') location.href = this.ticketUrl
        else this.$router.push({
          path: '/school-bus-plus/order/return-ticket',
          query: {
            orderId: this.orderId
          }
        })
      }
    }
  }

  function initList(vm, res) {
    if (res.data.code === "1000") vm.list = res.data.message
    else vm.$notify(res.data.message)

    // 延时100毫秒，计算车票列表是否高于窗口
    setTimeout(() => {
      vm.isRefresh = window.innerHeight - 71 > vm.$refs.busList.offsetHeight
    }, 100);
  }

</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .valueClass {
    color: #F44336;
  }

  .refresh {
    height: calc(100vh - 71px);
  }
</style>