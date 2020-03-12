<template>
  <van-tabbar route safe-area-inset-bottom>
    <van-tabbar-item icon="home-o" to="/main/home">主页</van-tabbar-item>
    <van-tabbar-item icon="todo-list-o" to="/main/class-schedule">课程</van-tabbar-item>
    <van-tabbar-item v-if="busPower==='1'" icon="logistics" :to="schoolBusUrl">校车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/main/profile">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from "vant";

  export default {
    data() {
      return {
        schoolBusUrl: "/main/school-bus-pro",
        busPower: 1
      }
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    },
    created() {
      this.busPower = localStorage.getItem("busPower")
      if (this.busPower==='1') this.schoolBusUrl = "/main/school-bus-pro"
      else this.schoolBusUrl = "/main/school-bus"
    }
  };
</script>
