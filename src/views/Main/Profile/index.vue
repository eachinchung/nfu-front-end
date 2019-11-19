<template>
  <div class="profile">
    <van-nav-bar class="title" title="个人档案"/>

    <van-cell-group title="账号信息" class="group">
      <van-cell size="large" icon="contact" title="账号" :value="user"/>
      <van-cell size="large" icon="contact" title="姓名" :value="name"/>
    </van-cell-group>

    <van-cell-group>
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
        @click="$toast('该功能正在开发中...')"
        is-link
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="row">
      <van-button type="default" class="button" @click="$toast('该功能正在开发中...')">修改密码</van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="warning" class="button" @click="logout">退出登录</van-button>
    </van-row>

    <popup
      :showPicker="showPicker"
      @getRoomId="getDormitory"
      @close="close"
      :dormitoryValue="dormitory"
    />
  </div>
</template>

<script>
  import {updateDormitory} from "../../../network/profile";
  import {checkLogin, refresh, handle_token} from "../../../network/token"
  import {getUserData} from "../../../network/profile";

  import Popup from "@/components/dormitory_popup";

  function init(vm, res) {

    vm.user = res.data.id;
    vm.name = res.data.name;
    vm.email = res.data.email;
    vm.dormitory = res.data.dormitory;

  }

  export default {
    data() {
      return {
        user: null,
        name: null,
        email: null,
        dormitory: null,
        showPicker: false
      };
    },
    components: {
      Popup
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    created() {
      getUserData(this.$store.state.access_token).then(res => {
        if (res.data.code === "1000") init(this, res)
        else if (res.data.code === "1001") return refresh()
        else this.$notify(res.data.message)
      }).then(res => {
        if (res.data.code === "1000") {
          handle_token(res)
          return getUserData(this.$store.state.access_token)
        }
      }).then(res => {
        if (res.data.code === "1000") init(this, res)
      }).catch(() => {
        this.$notify("不可预知错误")
      })
    },
    methods: {
      logout() {
        document.cookie = "remember=;expires=-1;path=/";
        this.$store.commit("rmToken");
        this.$router.push("/login");
      },
      getDormitory(room) {
        if (room[0] !== this.dormitory) {
          this.dormitory = room[0];
          updateDormitory(room[1])
        }
      },
      close() {
        this.showPicker = false;
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/common.css";

  .profile .row {
    margin-top: 40px;
    margin-bottom: 15px;
  }

  .profile .button {
    width: 90%;
  }
</style>
