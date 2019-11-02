<template>
  <div>
    <van-nav-bar class="title" :title="$store.state.bus_date" left-arrow @click-left="onClickLeft"/>

    <van-cell-group v-if="typeof scheduleList == 'string'">
      <van-cell size="large" :title="scheduleList"/>
    </van-cell-group>
    <van-cell-group v-else class="group">
      <van-cell v-for="item in scheduleList" :key="item.id" size="large" is-link>
        <template slot="title">
          <b>{{item.start_time}}&nbsp;</b>
          <van-tag v-if="item.bus_type===2" type="primary">加班车</van-tag>
        </template>
        <template slot="default">
          <span v-if="item.ticket_left===0" :style="{color:'red'}">{{item.ticket_left}}</span>
          <span v-else-if="item.ticket_left<20" :style="{color:'orange'}">{{item.ticket_left}}</span>
          <span v-else :style="{color:'green'}">{{item.ticket_left}}</span>
        </template>
        <template slot="label">
          <div class="ticketList">{{item.pathway}}</div>
        </template>
      </van-cell>
    </van-cell-group>


  </div>
</template>

<script>
    import {beforeRouteCheck} from "@/network/refresh_token";
    import {schedule} from "@/network/school_bus";

    function init(vm) {
        if (vm.$store.state.bus_date == null || vm.$store.state.route_id == null) {
            vm.$router.push("/main/school_bus");
            return null;
        }

        schedule(vm.$store.state.access_token, vm.$store.state.route_id, vm.$store.state.bus_date).then(
            res => {
                if (res.data.adopt) vm.scheduleList = res.data.message.desc
                else this.$notify(res.data.message);
            }
        )

    }

    export default {
        data() {
            return {
                scheduleList: []
            }
        },
        beforeRouteEnter(to, from, next) {
            beforeRouteCheck(next, to, init)
        },
        methods: {
            onClickLeft() {
                this.$router.push("/school_bus/date");
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

  .title {
    position: sticky;
    top: 0;
    left: 0;
  }

  .group {
    margin-bottom: 25px;
  }
</style>
