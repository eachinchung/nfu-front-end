<template>
  <div>
    <van-nav-bar class="title" :title="$store.state.bus_date" left-arrow @click-left="onClickLeft"/>

    <van-cell-group v-if="typeof scheduleList == 'string'">
      <!-- 如果scheduleList不是列表，则今天已经没有班车了 -->
      <van-cell size="large" :title="scheduleList"/>
    </van-cell-group>
    <van-cell-group v-else class="group">
      <van-cell v-for="item in scheduleList" :key="item.id" size="large" is-link>
        <template slot="title">
          <b>{{item.start_time}}&nbsp;</b>
          <!-- 判断是否为加班车 -->
          <van-tag v-if="item.bus_type===2" type="primary">加班车</van-tag>
        </template>
        <template slot="default">
          <!-- 车票剩余0就为红色 -->
          <span v-if="item.ticket_left===0" class="ticketRed">{{item.ticket_left}}</span>
          <!-- 车票小于20就为橙色 -->
          <span v-else-if="item.ticket_left<20" class="ticketOrange">{{item.ticket_left}}</span>
          <!-- 车票正常为绿色 -->
          <span v-else class="ticketGreen">{{item.ticket_left}}</span>
        </template>
        <template slot="label">
          <!-- 经过的车站 -->
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

    // 向服务器请求班车数据
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

  .ticketRed {
    color: #F44336;
  }

  .ticketOrange {
    color: #FFC107;
  }

  .ticketGreen {
    color: #4CAF50;
  }
</style>
