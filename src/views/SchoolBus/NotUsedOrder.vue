<template>
  <div>
    <van-nav-bar
      class="title"
      title="待乘车订单"
      left-arrow
      @click-left="$router.push('/main/schoolBus')"
    />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <div :class="{ refresh: isRefresh }">
        <div ref="busList">
          <div v-if="list">
            <van-cell-group v-if="list.length===0">
              <van-cell size="large" title="暂无待乘车订单"/>
            </van-cell-group>
            <van-cell-group v-else>
              <van-cell v-for="item in list"
                        :title="`${item.date} ${item.week} ${item.start_time}`"
                        :value="`${item.price}¥`"
                        :label="`${item.start_from_name} -> ${item.start_to_name}`"
                        :key="item.id"
                        value-class="valueClass"
                        size="large" is-link
                        @click="onClickList(item.id)"
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
          :url="ticketUrl"/>
        <van-cell title="退票" size="large" clickable @click="onClickReturnTicket"/>
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
          @click="returnTicket(index)"
        >
          <span slot="default" v-if="item.code!=='1000'">
            已退款
          </span>
        </van-cell>
      </van-cell-group>
    </van-popup>

  </div>
</template>

<script>

  import {checkLogin} from "../../network/token";
  import {notUsedOrder, returnTicket, ticketId, ticketUrl} from "../../network/schoolBus";

  export default {
    data() {
      return {
        list: null,
        show: false,
        orderId: null,
        isLoading: false,
        isRefresh: true,
        ticketList: null,
        returnShow: false
      }
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },

    mounted() {
      notUsedOrder()
        .then(res => {
          if (res.data.code === "1000") this.list = res.data.message
          else this.$notify(res.data.message)

          setTimeout(() => {
            this.isRefresh = window.innerHeight - 71 > this.$refs.busList.offsetHeight;
          }, 100);
        })
        .catch(() => this.$notify('未知错误'))
    },
    computed: {
      ticketUrl() {
        return ticketUrl(this.$store.state.accessToken, this.orderId)
      }
    },

    methods: {
      onClickList(order_id) {
        this.show = true
        this.orderId = order_id
      },
      onRefresh() {
        notUsedOrder()
          .then(res => {
            if (res.data.code === "1000") this.list = res.data.message
            else this.$notify(res.data.message);
            this.isLoading = false
            setTimeout(() => {
              this.isRefresh = window.innerHeight - 71 > this.$refs.busList.offsetHeight;
            }, 100);
          })
          .catch(() => {
            this.$notify('未知错误')
            this.isLoading = false
          })
      },
      onClickReturnTicket() {
        ticketId(this.orderId)
          .then(res => {
            if (res.data.code === "1000") this.ticketList = res.data.message
            this.show = false
            this.returnShow = true
          })
          .catch(() => this.$notify('未知错误'))
      },
      returnTicket(index) {
        if (this.ticketList[index].code === '1000') {
          this.$toast.loading({
            forbidClick: true,
            duration: 0,
          })
          returnTicket({
            orderId: this.orderId,
            ticketId: this.ticketList[index].ticket_id
          }).then(
            res => {
              if (res.data.code === "1000") {
                this.$notify({type: 'primary', message: res.data.message});
                this.ticketList[index].code = '1001'
              } else this.$notify(res.data.message)
            }
          )
        } else {
          this.$notify('该车票已退款')
          this.$toast.clear()
        }
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