<template>
  <van-tabbar route safe-area-inset-bottom>
    <van-tabbar-item icon="home-o" to="/main/home">主页</van-tabbar-item>
    <!-- <van-tabbar-item icon="todo-list-o" to="/main/class-schedule">课程</van-tabbar-item> -->
    <van-tabbar-item icon="logistics" to="/main/school-bus">校车</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/main/profile">设置</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import {Tabbar, TabbarItem} from "vant";

  export default {
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem
    }
  };
</script>
