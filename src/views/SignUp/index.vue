<template>
  <div class="sign_up">
    <van-nav-bar class="title" title="注册新用户" left-arrow
                 @click-left="onClickLeft"/>
    <user @getUser="get_user_data"/>

    <van-cell-group title="请设置个人信息" class="group">
      <van-field
        v-model="email"
        left-icon="envelop-o"
        type="text"
        label="邮箱"
        placeholder="请输入邮箱地址"
        @keyup.enter="login_btu"
      />
      <van-field
        readonly
        clickable
        left-icon="location-o"
        label="宿舍"
        :value="value"
        placeholder="选择宿舍"
        @click="showPicker = true"
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="row">
      <van-button type="primary" class="button" @click="sign_up_btn">注册</van-button>
    </van-row>

    <van-dialog
      v-model="show"
      title="注册成功"
      message="激活邮件已发送至您的邮箱，请查看。"
      @confirm="confirm"
    >
    </van-dialog>

    <popup :showPicker="showPicker" @getRoomId="get_dormitory" @close="close"/>

  </div>
</template>

<script>
    import {sign_up} from "@/network/no_token";
    import Popup from "@/components/dormitory_popup";
    import User from "./components/user";

    export default {
        data() {
            return {
                username: null,
                password: null,
                room_id: null,
                email: null,
                value: null,
                show: false,
                showPicker: false
            };
        },
        components: {
            User,
            Popup
        },
        methods: {
            get_user_data(user) {
                this.username = user[0];
                this.password = user[1];
            },
            get_dormitory(room) {
                this.value = room[0]
                this.room_id = room[1];
            },
            close() {
                this.showPicker = false
            },
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
            sign_up_btn() {
                if (this.check_username()) {
                    sign_up(this.username, this.password, this.room_id, this.email).then(
                        res => {
                            if (res.data.adopt) {
                                this.show = true
                            } else {
                                this.$notify(res.data.message);
                            }
                        },
                        () => {
                            this.$notify("不可预知错误");
                        }
                    );
                }
            },
            confirm() {
                this.$router.push("/login");
            },
            onClickLeft(){
                this.$router.push("/login");
            }
        }
    };
</script>

<style>
  .sign_up .button {
    margin-top: 40px;
    width: 90%;
  }

  .sign_up .title {
    margin-bottom: 20px;
  }

  .sign_up .group {
    margin-bottom: 15px;
  }

  .sign_up .row {
    margin-bottom: 15px;
  }
</style>
