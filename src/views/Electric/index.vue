<template>
  <div>
    <van-nav-bar
      class="title"
      title="电费管理"
      left-arrow
      @click-left="$router.push('/main/home')"
    />
    <van-skeleton
      title
      :row="10"
      :loading="electric==null||$store.state.dormitory==null"
    >
      <van-panel :title="$store.state.dormitory" :status="date" :style="{marginBottom:'55px'}">
        <div class="electric">
          <b>{{electric}}&nbsp;kW·h</b>
        </div>
      </van-panel>

      <van-row type="flex" justify="center">
        <van-button type="primary" @click="$toast('该功能正在开发中')" class="button">
          电费充值
        </van-button>
      </van-row>
    </van-skeleton>


  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {getElectric} from "@/network/electric";
  import {Skeleton} from "vant";
  import {getUserData} from "@/network/profile";


  export default {
    components: {
      [Skeleton.name]: Skeleton
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        date: null,
        electric: null
      }
    },
    created() {
      if (this.$store.state.dormitory == null) getUserData()
        .then(res => this.$store.commit("setUserData", {
          name: res.data.name,
          email: res.data.email,
          dormitory: res.data.dormitory
        }))
        .catch(() => this.$notify("服务器通信错误"))

      getElectric().then(res => {
        this.date = res.data.date
        this.electric = res.data.electric
      }).catch(() => this.$notify("服务器通信错误"))
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/common.css";

  .electric {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 35px;
    font-size: 24px;
  }

  .button {
    width: 80%;
  }
</style>