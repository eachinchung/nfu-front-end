<template>
  <van-tabbar route safe-area-inset-bottom>
    <van-tabbar-item icon="home-o" to="/main/home">主页</van-tabbar-item>
    <van-tabbar-item icon="todo-list-o" to="/main/class-schedule">课程</van-tabbar-item>
    <van-tabbar-item v-if="$store.state.busPower" icon="logistics" :to="schoolBusUrl">校车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/main/profile">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from "vant";

  export default {
    data() {
      return {
        schoolBusUrl: "/main/school-bus-plus"
      }
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    },
    created() {
      if (this.$store.state.busPower) this.schoolBusUrl = "/main/school-bus-plus"
      else this.schoolBusUrl = "/main/school-bus"
    }
  };
</script>
