<template>
  <div id="Login">
    <van-nav-bar class="title" title="南苑聚合"/>
    <van-cell-group title="请登录您的账号" class="group">
      <van-field v-model="username" left-icon="contact" label="学号" placeholder="请输入学号" clearable/>
      <van-field
        v-model="password"
        left-icon="edit"
        type="password"
        label="密码"
        placeholder="请输入密码"
        @keyup.enter="loginBtu"
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="row">
      <van-button type="primary" class="button" @click="loginBtu">登录</van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="default" class="button" to="/sign-up">注册</van-button>
    </van-row>
  </div>
</template>

<script>
  import {login} from "../network/oauth"
  import {handleToken} from "../network/token"

  function check(vm) {
    if (vm.username == null || vm.username === "") {
      vm.$notify("账号不能为空")
      return false
    }
    if (vm.password == null || vm.password === "") {
      vm.$notify("密码不能为空")
      return false
    }
    return true
  }

  export default {
    data() {
      return {
        username: null,
        password: null,
        path: '/'
      };
    },
    beforeRouteEnter(to, from, next) {
      if (localStorage.getItem("remember") !== null) next("/")
    },
    created() {
      if (this.$route.query.next != null) this.path = this.$route.query.next
    },
    methods: {
      loginBtu() {
        if (check(this)) {
          login(this.username, this.password).then(
            res => {
              if (res.data.code === "1000") {
                handleToken(res)
                this.$router.push(this.path)
              } else this.$notify(res.data.message)
            }
          ).catch(() => this.$notify("不可预知错误"))
        }
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/login.css";
</style>
