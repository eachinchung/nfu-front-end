<template>
  <div>
    <van-nav-bar class="title" :border="false" title="注册南苑聚合账号"/>
    <div class="login-group-title">
      请设置个人信息
    </div>
    <div class="card login-group">
      <van-field
        class="cardItem"
        v-model="email"
        left-icon="envelop-o"
        type="text"
        label="邮箱"
        placeholder="请输入邮箱地址"
        @keyup.enter="signUpBtn"
      />
      <van-field
        class="cardItem"
        readonly
        clickable
        left-icon="location-o"
        label="宿舍"
        :value="value"
        placeholder="选择宿舍"
        @click="showPicker = true"
      />
    </div>

    <van-row type="flex" justify="center">
      <van-button type="primary" class="login-button" :loading="loading" @click="signUpBtn">注册</van-button>
    </van-row>

    <popup :showPicker="showPicker" @getRoomId="getDormitory" @close="showPicker = false"/>
  </div>
</template>

<script>
  import Popup from "@/components/dormitoryPopup"
  import {Button, Col, Dialog, Field, Row} from "vant";
  import {nfucaSignUp} from "@/network/oauth";

  export default {
    data() {
      return {
        email: "",
        loading: false,
        nullErr: null,
        roomId: null,
        showPicker: false,
        value: null
      };
    },
    components: {
      Popup,
      [Button.name]: Button,
      [Field.name]: Field,
      [Row.name]: Row,
      [Col.name]: Col
    },
    created(){
      Dialog.alert({
        title: "密码说明",
        messageAlign: "left",
        message:
          "教务系统密码将作为账号默认密码。\n您的密码已加密，南苑聚合不能读取您的密码。"
      }).then(() => {})
    },
    methods: {
      getDormitory(room) {
        this.value = room[0]
        this.roomId = room[1]
      },
      check() {

        this.nullErr = null
        if (this.email === "") this.nullErr = "email"
        else if (this.roomId === null) this.nullErr = "roomId"

        switch (this.nullErr) {
          case "email":
            this.$notify("邮箱不能为空")
            break
          case "roomId":
            this.$notify("宿舍不能为空")
            break
        }
      },
      signUpBtn() {
        this.check()

        if (this.nullErr == null) {
          this.loading = true

          nfucaSignUp(this.$route.query.sign, this.roomId, this.email)
            .then(res => {
              this.loading = false
              if (res.data.code === "1000") {
                Dialog.alert({
                  title: "注册成功",
                  message: "激活邮件已发送至您的邮箱，请查看。"
                }).then(() => this.$router.replace('/login'))
              } else this.$notify(res.data.message)
            })
            .catch(() => {
              this.loading = false
              this.$notify("无法连接到服务器")
            })
        }
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

  .login-group-title {
    padding-top: 10px;
    padding-left: 32px;
    padding-bottom: 12px;
    color: #969799;
    font-size: 14px;
    line-height: 16px;
  }
</style>