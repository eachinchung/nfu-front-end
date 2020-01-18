<template>
  <div id="SingUp">
    <van-nav-bar class="sing-up-title" title="注册新用户" left-arrow @click-left="$router.push('/login')"/>
    <user @getUser="getUserData"/>

    <van-cell-group title="请设置个人信息">
      <van-field
        v-model="email"
        left-icon="envelop-o"
        type="text"
        label="邮箱"
        placeholder="请输入邮箱地址"
        @keyup.enter="signUpBtn"
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

    <van-row type="flex" justify="center" class="sing-up-row">
      <van-button type="primary" class="sing-up-button" :loading="loading" @click="signUpBtn">注册</van-button>
    </van-row>

    <popup :showPicker="showPicker" @getRoomId="getDormitory" @close="showPicker = false"/>
  </div>
</template>

<script>
  import {signUp} from "@/network/oauth"
  import Popup from "@/components/dormitoryPopup"
  import User from "./components/User"
  import {Button, CellGroup, Col, Dialog, Field, Row} from "vant";

  export default {
    data() {
      return {
        email: "",
        loading: false,
        nullErr: null,
        password: "",
        roomId: null,
        showPicker: false,
        username: "",
        value: null
      };
    },
    components: {
      User,
      Popup,
      [Button.name]: Button,
      [Field.name]: Field,
      [Row.name]: Row,
      [Col.name]: Col,
      [CellGroup.name]: CellGroup
    },
    methods: {
      getUserData(user) {
        this.username = user[0]
        this.password = user[1]
      },
      getDormitory(room) {
        this.value = room[0]
        this.roomId = room[1]
      },
      check() {

        this.nullErr = null
        if (this.username === "") this.nullErr = "username"
        else if (this.password === "") this.nullErr = "password"
        else if (this.email === "") this.nullErr = "email"
        else if (this.roomId === null) this.nullErr = "roomId"

        switch (this.nullErr) {
          case "username":
            this.$notify("账号不能为空")
            break
          case "password":
            this.$notify("密码不能为空")
            break
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

          signUp(this.username, this.password, this.roomId, this.email)
            .then(res => {
              this.loading = false

              if (res.data.code === "1000") {
                Dialog.alert({
                  title: "注册成功",
                  message: "激活邮件已发送至您的邮箱，请查看。"
                }).then(() => this.$router.push('/login'))
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
  .sing-up-button {
    width: 90%;
    margin-top: 55px;
  }

  .sing-up-title {
    position: sticky;
    top: 0;
    left: 0;
    margin-bottom: 20px;
  }

  .sing-up-row {
    margin-bottom: 15px;
  }
</style>
