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
      :loading="electric==null"
    >
      <div class="electric-main-card">
        <div class="electric-main-room">
          {{dormitory}}
        </div>
        <div class="electric-main-electric">
          <b>{{electric}}&nbsp;kW·h</b>
        </div>
      </div>

      <van-row type="flex" justify="center">
        <van-button type="primary" to="/electric/pay" class="electric-main-button">
          电费充值
        </van-button>
      </van-row>
    </van-skeleton>


  </div>
</template>

<script>
  import {checkLogin} from "@/network/token"
  import {getElectric} from "@/network/electric"
  import {Button, Col, Row, Skeleton} from "vant"


  export default {
    components: {
      [Skeleton.name]: Skeleton,
      [Button.name]: Button,
      [Row.name]: Row,
      [Col.name]: Col
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        date: null,
        electric: null,
        dormitory: localStorage.getItem('dormitory'),
      }
    },
    created() {
      getElectric().then(res => {
        this.date = res.data.date
        this.electric = res.data.electric
      }).catch(() => this.$notify("无法连接到服务器"))
    }
  }
</script>

<style scoped>
  .electric-main-electric {
    text-align: center;
    padding-top: 38px;
    font-size: 24px;
  }

  .electric-main-card {
    background: #ffffff;
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 45px;
    height: 168px;
  }

  .electric-main-room {
    padding-top: 15px;
    padding-left: 18px;
    color: #6e6f71;
  }

  .electric-main-button {
    width: 75%;
    border-radius: 5px;
  }
</style>