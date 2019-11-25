<template>
  <div>
    <van-nav-bar
      class="title"
      :title="$store.state.busDate"
      left-arrow
      @click-left="$router.push('/schoolBus/date')"
    />

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <div :class="{ refresh: isRefresh }">
        <div ref="busList">
          <div v-if="scheduleList">

            <van-cell-group v-if="typeof scheduleList == 'string'">
              <van-cell size="large" :title="scheduleList"/>
            </van-cell-group>

            <div v-else>
              <van-cell-group class="group">
                <van-cell
                  @click="onClickSchedule(item)"
                  v-for="item in scheduleList"
                  :key="item.id"
                  size="large"
                  is-link>

                  <template slot="title">
                    <b :style="{marginRight: '5px',verticalAlign: 'middle'}">{{item.start_time}}</b>
                    <van-tag v-if="item.bus_type===2" type="primary">加班车</van-tag>
                  </template>

                  <template slot="default">
                    <span :style="{color:surplusTicket(item.ticket_left)}">
                      {{item.ticket_left}}
                    </span>
                  </template>

                  <template slot="label">
                    <div class="ticketList">{{item.pathway}}</div>
                  </template>

                </van-cell>
              </van-cell-group>
            </div>

          </div>
        </div>
      </div>
    </van-pull-refresh>

    <van-popup v-model="show" position="bottom" safe-area-inset-bottom>
      <create-order :list="passengerList" :schedule="schedule" @close="show=false"/>
    </van-popup>

  </div>
</template>

<script>

  import CreateOrder from "./components/CreateOrder";
  import {checkLogin} from "../../../network/token";
  import {passenger, schedule} from "../../../network/schoolBus";

  export default {
    data() {
      return {
        schedule: null,
        scheduleList: null,
        passengerList: null,

        show: false,
        isLoading: false,
        isRefresh: true
      }
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    components: {CreateOrder},

    mounted() {
      if (this.$store.state.busDate == null || this.$store.state.routeId == null) this.$router.push("/main/schoolBus")
      else {
        // 提示正在加载中
        this.$toast.loading({forbidClick: true, duration: 0})

        // 获取班车列表
        schedule({
          routeId: this.$store.state.routeId,
          date: this.$store.state.busDate
        }).then(res => {
          if (res.data.code === "1000") this.scheduleList = res.data.message.desc
          else this.$notify(res.data.message);
          setTimeout(() => {
            this.isRefresh = window.innerHeight - 71 > this.$refs.busList.offsetHeight;
          }, 100);
          this.$toast.clear()

          // 获取乘车人数据
          return passenger()
        }).then(res => {
          if (res.data.code === "1000") this.passengerList = res.data.message
          else this.$notify(res.data.message);
        }).catch(() => {
          this.$notify("不可预知错误")
          this.$toast.clear()
        })
      }
    },

    methods: {
      surplusTicket(number) {
        // 计算余票的颜色
        if (number === 0) return "#F44336"
        return number < 20 ? "#FFC107" : "#4CAF50"
      },
      onClickSchedule(schedule) {
        this.show = true
        this.schedule = schedule
      },
      onRefresh() {
        schedule({
          routeId: this.$store.state.routeId,
          date: this.$store.state.busDate
        }).then(res => {
          if (res.data.code === "1000") {
            this.scheduleList = res.data.message.desc
          } else this.$notify(res.data.message);

          setTimeout(() => {
            this.isRefresh = window.innerHeight - 71 > this.$refs.busList.offsetHeight;
          }, 100);

          this.isLoading = false
        }).catch(() => {
          this.$notify("不可预知错误")
          this.isLoading = false
        })
      }
    }
  }
</script>

<style scoped>
  .ticketList {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 220px;
  }

  .group {
    margin-bottom: 25px;
  }

  .refresh {
    height: calc(100vh - 71px);
  }
</style>
