<template>
  <div id="school_bus">
    <van-nav-bar class="title" title="南苑 Bus" />

    <van-cell-group title="购买车票" class="group">
      <van-cell size="large" title="南苑->河堤公园" value="¥5" is-link @click="toSchedule(21)" />
      <van-cell size="large" title="河堤公园->南苑" value="¥5" is-link @click="toSchedule(22)" />
      <van-cell size="large" title="南苑->中大南校区" value="¥20" is-link @click="toSchedule(13)" />
      <van-cell size="large" title="中大南校区->南苑" value="¥20" is-link @click="toSchedule(14)" />
    </van-cell-group>

    <van-cell-group>
      <van-cell size="large" title="预售订单" is-link />
      <van-cell size="large" title="刷票订单" is-link />
      <van-cell size="large" title="待乘车订单" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import {
  refresh_token,
  check_refresh_token,
  handle_token
} from "@/network/refresh_token";

function init(school_bus, vm, path) {
  if (!school_bus) {
    vm.$dialog
      .alert({
        title: "该账户没有权限",
        message: "请联系管理员，绑定支付宝账号"
      })
      .then(() => {
        vm.$router.push(path);
      });
  }
}

export default {
  beforeRouteEnter(to, from, next) {
    if (check_refresh_token()) {
      const token = refresh_token();
      if (token[0]) {
        next(vm => {
          token[1].then(
            res => {
              if (handle_token(res)) {
                init(vm.$store.state.user.school_bus, vm, from.fullPath);
              } else vm.$notify("不可预知错误");
            },
            () => vm.$notify("无法连接到服务器")
          );
        });
      } else next("/login");
    } else next(vm => init(vm.$store.state.user.school_bus, vm, from.fullPath));
  },
  methods: {
    toSchedule(route_id) {
      this.$store.commit("upRouteId", route_id);
      this.$router.push("/school_bus/schedule");
    }
  }
};
</script>

<style>
@import "~@/assets/css/common.css";
</style>

