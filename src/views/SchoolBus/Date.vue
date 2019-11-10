<template>
  <div>
    <van-nav-bar class="title" title="请选择乘车日期" left-arrow @click-left="onClickLeft"/>

    <van-cell-group title="选择购买日期" class="group">
      <van-cell
          size="large"
          v-for="item in dateList"
          :title="item[0]"
          :value="item[1]"
          :key="item[0]"
          is-link
          @click="onClickDate(item[0],1)"
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell size="large" title="预售购票" is-link @click="showPicker=true"/>
    </van-cell-group>

    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showPicker=false"
          @confirm="showPicker=false"
      />
    </van-popup>
  </div>
</template>

<script>
  import {beforeRouteCheck} from "@/network/refresh_token";

  const WeekDay = [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];

  function init(vm) {
    let loop;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    if (vm.$store.state.route_id == null) {
      vm.$router.push("/main/school_bus");
      return null;
    } else if (vm.$store.state.route_id < 20) {
      loop = 6;
      vm.minDate = vm.currentDate = new Date(year, month, day + 6);
    } else {
      loop = 2;
      vm.minDate = vm.currentDate = new Date(year, month, day + 2);
    }

    vm.maxDate = new Date(year, month, day + 30);

    for (let i = 0; i < loop; i++) {
      const theDay = new Date(year, month, day + i);
      vm.dateList.push([
        theDay.getFullYear() +
        "-" +
        (Array(2).join(0) + (theDay.getMonth() + 1)).slice(-2) +
        "-" +
        (Array(2).join(0) + theDay.getDate()).slice(-2),
        WeekDay[theDay.getDay()]
      ]);
    }
  }

  export default {
    data() {
      return {
        dateList: [],
        currentDate: new Date(),
        showPicker: false,
        minDate: new Date(),
        maxDate: new Date()
      };
    },
    beforeRouteEnter(to, from, next) {
      beforeRouteCheck(next, to, init)
    },
    methods: {
      onClickLeft() {
        this.$router.push("/main/school_bus");
      },
      onClickDate(date, type) {
        this.$store.commit("upBusDate", date);
        this.$store.commit("SetTicketType", type);
        this.$router.push("/school_bus/schedule")
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/common.css";
</style>
