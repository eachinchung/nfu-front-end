<template>
  <div>
    <van-nav-bar class="title" title="请选择乘车日期" left-arrow @click-left="onClickLeft" />

    <van-cell-group title="选择购买日期" class="group">
      <van-cell
        size="large"
        v-for="item in dateList"
        :title="item[0]"
        :value="item[1]"
        :key="item[0]"
        is-link
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell size="large" title="预售购票" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import {
  refresh_token,
  check_refresh_token,
  handle_token
} from "@/network/refresh_token";

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
  if (vm.$store.state.route_id == null) vm.$router.push("/main/school_bus");
  else if (vm.$store.state.route_id < 20) loop = 6;
  else loop = 2;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate() + 6;

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
      dateList: []
    };
  },
  beforeRouteEnter(to, from, next) {
    if (check_refresh_token()) {
      const token = refresh_token();
      if (token[0]) {
        next(vm => {
          token[1].then(
            res => {
              if (handle_token(res)) init(vm);
              else vm.$notify("不可预知错误");
            },
            () => vm.$notify("无法连接到服务器")
          );
        });
      } else next({ path: "/login", query: { next: to.fullPath } });
    } else next(vm => init(vm));
  },
  methods: {
    onClickLeft() {
      this.$router.push("/main/school_bus");
    }
  }
};
</script>

<style>
@import "~@/assets/css/common.css";
</style>
