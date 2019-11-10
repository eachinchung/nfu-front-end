<template>
  <div>
    <van-nav-bar
      class="title"
      title="待乘车订单"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
  import {beforeRouteCheck} from "@/network/refresh_token";
  import {notUsedOrder} from "@/network/school_bus";

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
    name: "NotUsedOrder",
    data() {
      return {
        list: null
      }
    },
    beforeRouteEnter(to, from, next) {
      beforeRouteCheck(next, to, init)
    },
    methods: {
      onClickLeft() {
        this.$router.push("/main/school-bus");
      }
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/common.css";
</style>