<template>
  <div>
    <van-nav-bar class="title" :title="$store.state.bus_date" left-arrow @click-left="onClickLeft"/>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <div :class="{ refresh: isRefresh }">
        <div ref="busList">
          <div v-if="scheduleList">

            <van-cell-group v-if="typeof scheduleList == 'string'">
              <van-cell size="large" :title="scheduleList"/>
            </van-cell-group>

            <div v-else>
              <van-cell-group class="group">
                <van-cell v-for="item in scheduleList" :key="item.id" size="large" is-link
                          @click="onClickSchedule(item)">
                  <template slot="title">
                    <b>{{item.start_time}}&nbsp;</b>
                    <van-tag v-if="item.bus_type===2" type="primary">加班车</van-tag>
                  </template>
                  <template slot="default">
                    <span v-if="item.ticket_left===0" class="ticketRed">{{item.ticket_left}}</span>
                    <span v-else-if="item.ticket_left<20" class="ticketOrange">{{item.ticket_left}}</span>
                    <span v-else class="ticketGreen">{{item.ticket_left}}</span>
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
  import {beforeRouteCheckNotInit} from "@/network/refresh_token";
  import {schedule, passenger} from "@/network/school_bus";
  import CreateOrder from "./components/CreateOrder";

  export default {
    data() {
      return {
        scheduleList: null,
        passengerList: null,
        show: false,
        isLoading: false,
        schedule: null,
        isRefresh: true
      }
    },
    beforeRouteEnter(to, from, next) {
      beforeRouteCheckNotInit(next, to)
    },
    components: {CreateOrder},
    mounted() {
      if (this.$store.state.bus_date == null || this.$store.state.route_id == null) {
        this.$router.push("/main/school-bus");
        return null;
      }
      // 向服务器请求班车数据
      schedule(this.$store.state.access_token, this.$store.state.route_id, this.$store.state.bus_date).then(
        res => {
          if (res.data.adopt) this.scheduleList = res.data.message.desc
          else this.$notify(res.data.message);
          setTimeout(() => {
            this.isRefresh = window.innerHeight - 71 > this.$refs.busList.offsetHeight;
          }, 100);
        }
      )
      // 想服务器请求乘客数据
      passenger(this.$store.state.access_token).then(
        res => {
          if (res.data.adopt) this.passengerList = res.data.message
          else this.$notify(res.data.message);
        }
      )
    },
    methods: {
      onClickLeft() {
        this.$router.push("/school-bus/date");
      },
      onClickSchedule(schedule) {
        this.show = true
        this.schedule = schedule
      },
      onRefresh() {
        schedule(this.$store.state.access_token, this.$store.state.route_id, this.$store.state.bus_date).then(
          res => {
            if (res.data.adopt) {
              this.scheduleList = res.data.message.desc
            } else this.$notify(res.data.message);
            this.isLoading = false
            setTimeout(() => {
              this.isRefresh = window.innerHeight - 71 > this.$refs.busList.offsetHeight;
            }, 100);
          }
        )
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

  .ticketRed {
    color: #F44336;
  }

  .ticketOrange {
    color: #FFC107;
  }

  .ticketGreen {
    color: #4CAF50;
  }

  .refresh {
    height: calc(100vh - 71px);
  }
</style>
