<template>
  <div>
    <van-nav-bar class="title" title="个人档案"/>
    <div class="card">
      <van-cell class="cardItem" icon="contact" title="账号" :value="userId"/>
      <van-cell class="cardItem" icon="smile-o" title="姓名" :value="name"/>
      <van-cell
        class="cardItem"
        icon="location-o"
        title="宿舍"
        :value="dormitory"
        placeholder="选择宿舍"
        @click="showPicker = true"
        is-link
      />
      <van-cell
        class="cardItem"
        icon="envelop-o"
        title="邮箱"
        :value="email"
        @click="$toast('该功能正在开发中')"
        is-link
      />
    </div>

    <div class="card">
      <van-cell
        class="cardItem"
        icon="comment-o"
        title="意见反馈"
        to="/feedback"
        is-link
      />
      <van-cell
        class="cardItem"
        icon="gift-card-o"
        title="请我喝红牛"
        @click="showPay=true"
        is-link
      />
    </div>


    <van-row type="flex" justify="center" class="profile-row">
      <van-button type="default" class="profile-button" @click="showSetPassword=true">修改密码</van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="warning" class="profile-button" :loading="loading" @click="logout">退出登录</van-button>
    </van-row>

    <div :style="{height:'100px'}"></div>


    <my-popup
      :showPicker="showPicker"
      @getRoomId="getDormitory"
      @close="close"
      :dormitoryValue="dormitory"
    />

    <van-popup v-model="showSetPassword">
      <set-password class="profile-popup" @close="showSetPassword=false"/>
    </van-popup>

    <van-action-sheet
      v-model="showPay"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      description="为熬夜写代码的小哥哥，买一瓶红牛"
      @select="onSelect"
    />

    <van-popup v-model="showPayQr" close-on-popstate>
      <van-image src="/img/eachinAlipay.jpg" width="80vw" height="80vw">
        <template v-slot:loading>
          <van-loading type="spinner" size="20"/>
        </template>
      </van-image>
    </van-popup>

  </div>
</template>

<script>
  import {setDormitory} from "@/network/profile"
  import {checkLogin} from "@/network/token"

  import SetPassword from "./components/SetPassword"
  import MyPopup from "@/components/dormitoryPopup"
  import {ActionSheet, Button, Image, Loading, Popup, Row} from "vant";


  export default {
    data() {
      return {
        userId: localStorage.getItem('userId'),
        name: localStorage.getItem('name'),
        dormitory: localStorage.getItem('dormitory'),
        email: localStorage.getItem('email'),
        actions: [
          {name: '唤起支付宝付款'},
          {name: '支付宝付款码'}
        ],
        showPay: false,
        showPayQr: false,
        showPicker: false,
        showSetPassword: false,
        loading: false
      };
    },
    components: {
      MyPopup,
      SetPassword,
      [ActionSheet.name]: ActionSheet,
      [Image.name]: Image,
      [Loading.name]: Loading,
      [Popup.name]: Popup,
      [Button.name]: Button,
      [Row.name]: Row
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    methods: {
      logout() {
        this.loading = true
        localStorage.clear()
        location.reload()
      },
      getDormitory(room) {
        if (room[0] !== this.dormitory) setDormitory(room[1]).then(() => {
          localStorage.setItem("dormitory", room[0])
          this.$store.commit("update")
          this.dormitory = room[0]
        }).catch(() => this.$notify("无法连接到服务器"))
      },
      close() {
        this.showPicker = false;
      },
      onSelect(item) {
        if (item.name === '唤起支付宝付款') location.href = 'alipays://platformapi/startapp?appId=20000067&url=https%3A%2F%2Fqr.alipay.com%2Ffkx00396eoerrddsjcajh76'
        if (item.name === '支付宝付款码') this.showPayQr = true
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .profile-row {
    margin-top: 40px;
    margin-bottom: 15px;
  }

  .profile-button {
    width: 85%;
    border-radius: 5px;
  }

  .profile-popup {
    width: 85vw;
  }
</style>
