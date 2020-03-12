<template>
  <div>
    <van-nav-bar class="login-title" :border="false" title="南苑聚合"/>
    <van-cell-group title="请登录您的账号" class="login-group">
      <van-field
        v-model="username"
        left-icon="contact"
        label="学号"
        placeholder="请输入学号"
        clearable
        :error-message="usernameErr"
      />
      <van-field
        v-model="password"
        left-icon="edit"
        type="password"
        label="密码"
        placeholder="请输入密码"
        @keyup.enter="loginBtu"
        :error-message="passwordErr"
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="login-row">
      <van-button type="primary" class="login-button" :loading="loading" @click="loginBtu">登录</van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="default" class="login-button" to="/sign-up">注册</van-button>
    </van-row>
  </div>
</template>

<script>
  import {login} from "../network/oauth"
  import {handleToken} from "../network/token"
  import {Button, CellGroup, Col, Field, Row} from "vant";

  export default {
    components: {
      [Button.name]: Button,
      [Field.name]: Field,
      [Row.name]: Row,
      [Col.name]: Col,
      [CellGroup.name]: CellGroup
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
                this.$router.push(this.path)
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
      }
    }
  };
</script>

<style scoped>
  .login-button {
    width: 90%;
  }

  .login-title {
    position: sticky;
    top: 0;
    left: 0;
    margin-bottom: 20px;
  }

  .login-group {
    margin-bottom: 45px;
  }

  .login-row {
    margin-bottom: 15px;
  }
</style>
