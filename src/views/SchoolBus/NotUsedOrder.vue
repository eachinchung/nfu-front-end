<template>
  <div>
    <van-nav-bar
      class="title"
      title="待乘车订单"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="余票刷新成功">
      <div v-if="list" :class="{ refresh: isRefresh }">
        <van-cell-group ref="busList">
          <van-cell v-for="item in list"
                    :title="`${item.date} ${item.week} ${item.start_time}`"
                    :value="`${item.price}¥`"
                    :label="`${item.start_from_name} -> ${item.start_to_name}`"
                    :key="item.id"
                    value-class="valueClass"
                    is-link size="large"
                    @click="onClickList(item.id)"
          />
        </van-cell-group>

        <van-popup v-model="show">
          <van-cell-group class="row">
            <van-cell
              title="电子票"
              size="large"
              clickable
              :url="ticketUrl"/>
            <van-cell title="退票" size="large" clickable/>
          </van-cell-group>
        </van-popup>

      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
  import {beforeRouteCheck} from "@/network/refresh_token";
  import {notUsedOrder, ticketUrl} from "@/network/school_bus";

  function init(vm) {
    notUsedOrder(vm.$store.state.access_token).then(
      res => {
        if (res.data.adopt) vm.list = res.data.message
        else vm.$notify(res.data.message);
      },
      () => vm.$notify('未知错误')
    )
  }

  export default {
    beforeRouteEnter(to, from, next) {
      beforeRouteCheck(next, to, init)
    },
    data() {
      return {
        list: null,
        show: false,
        orderId: null,
        isLoading: false,
        isRefresh: true
      }
    },
    computed: {
      ticketUrl() {
        return ticketUrl(this.$store.state.access_token, this.orderId)
      }
    },
    mounted() {
      setTimeout(() => {
        this.isRefresh = window.innerHeight - 71 > this.$refs.busList.offsetHeight;
      }, 1000);
    },
    methods: {
      onClickLeft() {
        this.$router.push("/main/school-bus");
      },
      onClickList(order_id) {
        this.show = true
        this.orderId = order_id
      },
      onRefresh() {
        notUsedOrder(this.$store.state.access_token).then(
          res => {
            if (res.data.adopt) this.list = res.data.message
            else this.$notify(res.data.message);
            this.isLoading = false
            setTimeout(() => {
              this.isRefresh = window.innerHeight - 71 > this.$refs.busList.offsetHeight;
            }, 100);
          },
          () => {
            this.$notify('未知错误')
            this.isLoading = false
          }
        )
      }
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/common.css";

  .row {
    width: 85vw;
  }

  .valueClass {
    color: #F44336;
  }

  .refresh {
    height: calc(100vh - 71px);
  }
</style>