<template>
  <div>
    <van-nav-bar class="title" title="请选择乘车日期" left-arrow @click-left="onClickLeft"/>

    <div class="card">
      <van-cell
        class="cardItem"
        v-for="item in dateList"
        :title="item[0]"
        :value="item[1]"
        :key="item[0]"
        is-link
        @click="onClickDate(item[0],1)"
      />
    </div>

  </div>
</template>

<script>
  import {checkLogin} from "../../network/token"
  import {Popup} from "vant";

  const WeekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]

  function init(vm) {
    let loop

    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const day = today.getDate()

    // 根据班车路线，选择预售日期的范围
    if (vm.$store.state.routeId == null) {
      vm.$router.push("/main/school-bus-pro")
      return null;
    } else if (vm.$store.state.routeId < 20) {
      loop = 6;
      vm.minDate = vm.currentDate = new Date(year, month, day + 6)
    } else {
      loop = 2;
      vm.minDate = vm.currentDate = new Date(year, month, day + 2)
    }

    // 获取预售日期
    vm.maxDate = new Date(year, month, day + 30)
    for (let i = 0; i < loop; i++) {
      const theDay = new Date(year, month, day + i)
      vm.dateList.push([
        `${theDay.getFullYear()}-${(theDay.getMonth() + 1).toString().padStart(2, "0")}-${theDay.getDate().toString().padStart(2, "0")}`,
        WeekDay[theDay.getDay()]
      ]);
    }
  }

  export default {
    components: {[Popup.name]: Popup},
    data() {
      return {
        dateList: [],
        currentDate: null,
        showPicker: false,
        minDate: null,
        maxDate: null
      };
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    created() {
      init(this)
    },
    methods: {
      onClickLeft() {
        this.$router.push("/main/school-bus-pro")
      },
      onClickDate(date, type) {
        this.$store.commit("setBusDate", date)
        this.$store.commit("setTicketType", type)
        this.$router.push("/school-bus-pro/schedule")
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/card.css";
</style>
