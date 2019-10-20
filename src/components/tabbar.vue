<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
    <van-tabbar-item icon="todo-list-o" to="/class_schedule">课程</van-tabbar-item>
    <van-tabbar-item icon="logistics" to="/school_bus">校车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/profile">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "Index",
  data() {
    return {
      active: 0
    };
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
};
</script>
