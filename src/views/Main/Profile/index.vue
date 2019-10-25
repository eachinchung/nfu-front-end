<template>
  <div class="profile">
    <van-nav-bar class="title" title="个人档案"/>

    <van-cell-group title="账号信息" class="group">
      <van-cell size="large" icon="contact" title="账号" :value="user"/>
      <van-cell size="large" icon="contact" title="姓名" :value="name"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell size="large" icon="location-o" title="宿舍" :value="dormitory" is-link/>
      <van-cell size="large" icon="envelop-o" title="邮箱" :value="email" is-link/>
    </van-cell-group>

    <van-row type="flex" justify="center" class="row">
      <van-button type="default" class="button">修改密码</van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="warning" class="button" @click="logout">退出登录</van-button>
    </van-row>
  </div>
</template>

<script>
    import {get_user} from "@/network/profile";
    import {refresh_token, check_refresh_token, handle_token} from "@/network/refresh_token";

    function init(token, vm) {
        get_user(token).then(
            res => {
                vm.user = res.data.id;
                vm.name = res.data.name;
                vm.email = res.data.email;
                vm.dormitory = res.data.dormitory;
            },
            () => {
                vm.$notify("不可预知错误");
            }
        );
    }

    export default {
        data() {
            return {
                user: null,
                name: null,
                email: null,
                dormitory: null
            };
        },
        beforeRouteEnter: (to, from, next) => {
            if (check_refresh_token()) {
                const token = refresh_token();
                if (token[0]) {
                    next(vm => {
                        token[1].then(
                            res => {
                                if (handle_token(res)) {
                                    init(vm.$store.state.access_token, vm)
                                } else vm.$notify("不可预知错误")
                            },
                            () => vm.$notify("不可预知错误")
                        );
                    })
                } else next({path: "/login", query: {next: to.fullPath}})
            } else next(vm => init(vm.$store.state.access_token, vm))
        },

        methods: {
            logout() {
                document.cookie = "remember=;expires=-1;path=/";
                this.$store.commit("rmToken");
                this.$router.push("/login");
            }
        }
    };
</script>

<style>
  .profile .button {
    width: 90%;
  }

  .profile .title {
    margin-bottom: 25px;
  }

  .profile .group {
    margin-bottom: 30px;
  }

  .profile .row {
    margin-top: 40px;
    margin-bottom: 15px;
  }
</style>
