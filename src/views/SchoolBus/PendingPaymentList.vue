<template>
  <div>
    <van-nav-bar
      class="title"
      title="待付款订单"
      left-arrow
      @click-left="$router.push('/main/school-bus')"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <div :class="{ refresh: isRefresh }">
        <div ref="busList">
          <div v-if="list">

            <div class="card" v-if="list.length===0">
              <van-cell class="cardItem" size="large" title="暂无待付款订单" :style="{color:'#6e6f71'}"/>
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
                @click="pay(item.id)"
              />
            </div>

          </div>
        </div>
      </div>
    </van-pull-refresh>

  </div>
</template>

<script>
  import {checkLogin} from "../../network/token";
  import {pendingPayment} from "../../network/schoolBus";
  import {PullRefresh} from "vant";

  function initList(vm, res) {
    if (res.data.code === "1000") vm.list = res.data.message
    else vm.$notify(res.data.message)

    // 延时100毫秒，计算车票列表是否高于窗口
    setTimeout(() => {
      vm.isRefresh = window.innerHeight - 71 > vm.$refs.busList.offsetHeight
    }, 100);
  }

  export default {
    components: {[PullRefresh.name]: PullRefresh},
    data() {
      return {
        list: null,
        isLoading: false,
        isRefresh: true
      }
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    mounted() {
      // 提示正在加载中
      this.$toast.loading({forbidClick: true, duration: 0})

      // 获取车票列表
      pendingPayment()
        .then(res => {
          initList(this, res)
          this.$toast.clear()
        })
        .catch(() => {
          this.$notify("无法连接到服务器")
          this.$toast.clear()
        })
    },
    methods:{
      onRefresh() {
        pendingPayment()
          .then(res => {
            initList(this, res)
            this.isLoading = false
          })
          .catch(() => {
            this.$notify("无法连接到服务器")
            this.isLoading = false
          })
      },
      pay(orderId){
        this.$router.push({
          path: "/school-bus/order/pay",
          query: {
            orderId,
            from: "/school-bus/order/list/pending-payment"
          }
        })
      }
    }
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