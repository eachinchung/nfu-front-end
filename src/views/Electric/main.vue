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
      <div class="card">
        <div class="room">
          {{$store.state.dormitory}}
        </div>
        <div class="electric">
          <b>{{electric}}&nbsp;kW·h</b>
        </div>
      </div>

      <van-row type="flex" justify="center">
        <van-button type="primary" to="/electric/pay" class="button">
          电费充值
        </van-button>
      </van-row>
    </van-skeleton>


  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {getElectric} from "@/network/electric";
  import {Button, Skeleton} from "vant";
  import {getUserData} from "@/network/profile";


  export default {
    components: {
      [Skeleton.name]: Skeleton,
      [Button.name]: Button
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
        .catch(() => this.$notify("无法连接到服务器"))

      getElectric().then(res => {
        this.date = res.data.date
        this.electric = res.data.electric
      }).catch(() => this.$notify("无法连接到服务器"))
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/common.css";

  .electric {
    text-align: center;
    padding-top: 38px;
    font-size: 24px;
  }

  .card {
    background: #ffffff;
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 45px;
    height: 168px;
  }

  .room {
    padding-top: 15px;
    padding-left: 18px;
    color: #6e6f71;
  }

  .button {
    width: 75%;
    border-radius: 5px;
  }
</style>