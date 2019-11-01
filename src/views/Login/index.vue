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
        @keyup.enter="login_btu"
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="row">
      <van-button type="primary" class="button" @click="login_btu">登录</van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="default" class="button" to="sign_up">注册</van-button>
    </van-row>
  </div>
</template>

<script>
    import {login} from "@/network/no_token";

    export default {
        data() {
            return {
                username: null,
                password: null,
                path: '/'
            };
        },
        created() {
            if (this.$route.query.next != null) this.path = this.$route.query.next
        },
        methods: {
            check_username() {
                if (this.username == null || this.username === "") {
                    this.$notify("账号不能为空");
                    return false;
                }
                if (this.password == null || this.password === "") {
                    this.$notify("密码不能为空");
                    return false;
                }
                return true;
            },
            login_btu() {
                if (this.check_username()) {
                    login(this.username, this.password).then(
                        res => {
                            if (res.data.adopt) {

                                let exp = new Date();
                                exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
                                document.cookie =
                                    "remember=" +
                                    res.data.message.refresh_token +
                                    ";expires=" + exp + ';path=/';

                                this.$store.commit("upToken", res.data.message.access_token);
                                this.$router.push(this.path)
                            } else this.$notify(res.data.message);

                        },
                        () => {
                            this.$notify("不可预知错误");
                        }
                    );
                }
            }
        }
    };
</script>

<style>
@import "~@/assets/css/login.css";
</style>
