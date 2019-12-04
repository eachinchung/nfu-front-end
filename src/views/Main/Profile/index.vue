<template>
  <div>
    <van-nav-bar class="title" title="个人档案"/>

    <van-cell-group title="账号信息" class="group">
      <van-cell size="large" icon="contact" title="账号" :value="user"/>
      <van-cell size="large" icon="smile-o" title="姓名" :value="name"/>
      <van-cell
        size="large"
        icon="location-o"
        title="宿舍"
        :value="dormitory"
        placeholder="选择宿舍"
        @click="showPicker = true"
        is-link
      />
      <van-cell
        size="large"
        icon="envelop-o"
        title="邮箱"
        :value="email"
        @click="$notify({ type: 'primary', message: '修改邮箱功能预计12月推出' })"
        is-link
      />
    </van-cell-group>

    <van-cell-group>
      <van-cell
        size="large"
        icon="comment-o"
        title="意见反馈"
        @click="$toast('该功能正在开发中')"
        is-link
      />
      <van-cell
        size="large"
        icon="gift-card-o"
        title="请我喝红牛"
        @click="showPay=true"
        is-link
      />
    </van-cell-group>


    <van-row type="flex" justify="center" class="profileRow">
      <van-button type="default" class="profileButton" @click="showSetPassword=true">修改密码</van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="warning" class="profileButton" @click="logout">退出登录</van-button>
    </van-row>

    <div :style="{height:'120px'}"></div>

    <popup
      :showPicker="showPicker"
      @getRoomId="getDormitory"
      @close="close"
      :dormitoryValue="dormitory"
    />

    <van-popup v-model="showSetPassword">
      <set-password class="myPopup" @close="showSetPassword=false"/>
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
      <van-image :src="qrUrl" width="80vw" height="80vw">
        <template v-slot:loading>
          <van-loading type="spinner" size="20"/>
        </template>
      </van-image>
    </van-popup>

  </div>
</template>

<script>
  import {getUserData, setDormitory} from "../../../network/profile"
  import {checkLogin} from "../../../network/token"

  import SetPassword from "./components/SetPassword"
  import Popup from "../../../components/dormitoryPopup"

  function init(vm, res) {
    vm.user = res.data.id
    vm.name = res.data.name
    vm.email = res.data.email
    vm.dormitory = res.data.dormitory
    vm.$toast.clear()
  }

  export default {
    data() {
      return {
        user: null,
        name: null,
        email: null,
        dormitory: null,
        actions: [
          {name: '唤起支付宝付款'},
          {name: '支付宝付款码'}
        ],
        qrUrl: require('../../../assets/img/eachinAlipay.jpg'),
        showPay: false,
        showPayQr: false,
        showPicker: false,
        showSetPassword: false
      };
    },
    components: {
      Popup,
      SetPassword
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    created() {
      this.$toast.loading({forbidClick: true, duration: 0})
      getUserData()
        .then(res => init(this, res))
        .catch(() => {
          this.$notify("不可预知错误")
          this.$toast.clear()
        })
    },
    methods: {
      logout() {
        this.$store.commit("rmAccessToken")
        this.$router.push("/login")
      },
      getDormitory(room) {
        if (room[0] !== this.dormitory) setDormitory(room[1])
          .then(() => this.dormitory = room[0])
          .catch(() => this.$notify("不可预知错误"))
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
  .title {
    margin-bottom: 25px;
  }

  .group {
    margin-bottom: 30px;
  }

  .profileRow {
    margin-top: 40px;
    margin-bottom: 15px;
  }

  .profileButton {
    width: 90%;
  }

  .myPopup {
    width: 85vw;
  }
</style>
