<template>
  <div>
    <van-nav-bar class="title" :border="false" title="南苑聚合"/>

    <div class="login-group-title">
      请登录您的账号
    </div>
    <div class="card login-group">
      <van-field
        class="cardItem"
        v-model="username"
        left-icon="contact"
        label="学号"
        placeholder="请输入学号"
        clearable
        :error-message="usernameErr"
      />
      <van-field
        class="cardItem"
        v-model="password"
        left-icon="edit"
        type="password"
        label="密码"
        placeholder="请输入密码"
        @keyup.enter="loginBtu"
        :error-message="passwordErr"
      />
    </div>

    <van-row type="flex" justify="center" class="login-row">
      <van-button type="primary" class="login-button" :loading="loading" @click="loginBtu">登录</van-button>
    </van-row>
    <van-row type="flex" justify="center" class="login-row">
      <van-button icon="https://cdn.kaimon.cn/img/nfu/nfuca-logo.png" class="login-button" @click="nfucaLogin">南苑计协登录
      </van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="default" class="login-button" to="/sign-up">注册</van-button>
    </van-row>
  </div>
</template>

<script>
  import {login} from "../network/oauth"
  import {handleToken} from "../network/token"
  import {Button, Col, Dialog, Field, Row} from "vant";

  export default {
    components: {
      [Button.name]: Button,
      [Field.name]: Field,
      [Row.name]: Row,
      [Col.name]: Col
    },
    data() {
      return {
        path: '/',
        username: "",
        password: "",
        notErr: false,
        loading: false,
        usernameErr: null,
        passwordErr: null
      };
    },
    beforeRouteEnter(to, from, next) {
      if (localStorage.getItem("remember") !== null) next("/")
      else next()
    },
    created() {
      if (this.$route.query.next != null) this.path = this.$route.query.next
    },
    methods: {
      loginBtu() {
        this.notErr = this.username !== ""
        if (!this.notErr) this.usernameErr = "账号不能为空"
        else this.usernameErr = null

        this.notErr = this.password !== ""
        if (!this.notErr) this.passwordErr = "密码不能为空"
        else this.passwordErr = null

        if (this.notErr) {

          this.loading = true

          login(this.username, this.password).then(
            res => {
              this.loading = false

              if (res.data.code === "1000") {
                handleToken(res)
                this.$router.replace(this.path)
              }

              if (res.data.code === "0002") this.$notify(res.data.message)
              if (res.data.code === "0003") this.passwordErr = res.data.message
              if (res.data.code === "0004") this.usernameErr = res.data.message

              if (res.data.code === "0001") {
                this.$router.push("/sign-up")
                this.$toast.fail(res.data.message)
              }
            }).catch(() => {
            this.loading = false
            this.$notify("无法连接到服务器")
          })
        }
      },
      nfucaLogin() {
        Dialog.alert({
          title: '南苑计协登录',
          message: '我们支持计协账号登录啦！\n只要你关注了南苑计协公众号、\n并在微信打开此页面，\n就可以无密码登录哦~',
          showCancelButton: true,
        }).then(() => {
          location.replace('https://api.nfuca.com/openLogin?name=Eachin&redirectUri=' + process.env.VUE_APP_POST_URL + '/oauth/nfuca')
        }).catch(() => {
          // on cancel
        })
      }
    }
  };
</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .login-button {
    width: 80%;
    border-radius: 8px;
  }

  .login-group {
    margin-bottom: 45px;
    margin-left: 18px;
    margin-right: 18px;
  }

  .login-row {
    margin-bottom: 15px;
  }

  .login-group-title {
    padding-top: 10px;
    padding-left: 32px;
    padding-bottom: 12px;
    color: #969799;
    font-size: 14px;
    line-height: 16px;
  }
</style>
