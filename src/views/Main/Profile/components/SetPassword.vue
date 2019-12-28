<template>
  <div>
    <div class="setGroup">
      <van-cell-group title="两步验证">
        <van-field
          v-model="password"
          label="密码"
          placeholder="请输入密码"
          type="password"
          :error-message="passwordErr"
        />
        <van-field
          v-model="code"
          center
          clearable
          label="邮箱验证码"
          placeholder="请输入验证码"
          type="number"
          :error-message="codeErr"
        >
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="getVerificationCode"
            :disabled="codeDisabled"
            :style="{width:'78px'}"
          >{{codeMessage}}
          </van-button>

        </van-field>
      </van-cell-group>
    </div>

    <van-cell-group title="设置新密码">
      <van-field
        v-model="newPassword"
        label="新密码"
        placeholder="请输入新密码"
        type="password"
        :error-message="newPasswordErr"
      />
      <van-field
        v-model="repeatPassword"
        label="确认密码"
        placeholder="请再次输入密码"
        :error-message="repeatPasswordErr"
        type="password"
        @keyup.enter="setPassword"
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="myRow">
      <van-button type="warning" class="button" size="small" :loading="loading" @click="setPassword">修改密码</van-button>
    </van-row>
  </div>
</template>

<script>
  import {getVerificationCode, setPassword} from "../../../../network/profile"
  import {Button, Field, Row} from "vant";

  export default {
    components: {
      [Button.name]: Button,
      [Field.name]: Field,
      [Row.name]: Row
    },
    data() {
      return {
        code: "",
        codeDisabled: false,
        codeErr: null,
        codeMessage: "发送验证码",
        loading: false,
        newPassword: "",
        newPasswordErr: null,
        notErr: false,
        password: "",
        passwordErr: null,
        repeatPassword: "",
        repeatPasswordErr: null
      }
    },
    methods: {
      getVerificationCode() {
        getVerificationCode().then(() => {
          // 禁止按钮点击
          this.codeDisabled = true

          // 计时60秒
          let second = 60
          this.codeMessage = second
          const timer = setInterval(() => {
            second--
            if (second) {
              this.codeMessage = second
            } else {
              clearInterval(timer)
              this.codeMessage = "发送验证码"
              this.codeDisabled = false
            }
          }, 1000)

        }).catch(() => this.$notify("无法连接到服务器"))
      },
      passwordCheck() {
        // 检查密码是否为空
        this.notErr = this.password !== ''
        if (this.notErr) this.passwordErr = null
        else this.passwordErr = "该选项不能为空"
      },
      codeCheck() {
        // 检查验证码是否为空
        this.notErr = this.code !== ''
        if (this.notErr) {
          this.notErr = this.code.length === 6
          if (this.notErr) this.codeErr = null
          else this.codeErr = "验证码为6位"
        } else this.codeErr = "该选项不能为空"
      },
      newPasswordCheck() {
        // 检查新密码是否为空
        this.notErr = this.newPassword !== ''
        if (this.notErr) this.newPasswordErr = null
        else this.newPasswordErr = "该选项不能为空"
      },
      repeatPasswordCheck() {
        // 检查确认密码是否为空
        this.notErr = this.repeatPassword !== ''
        if (this.notErr) {
          // 两次输入的密码是否一致
          this.notErr = this.newPassword === this.repeatPassword
          if (this.notErr) this.repeatPasswordErr = null
          else this.repeatPasswordErr = "两次输入的密码不一致"
        } else this.repeatPasswordErr = "该选项不能为空"
      },
      setPassword() {
        this.passwordCheck()
        this.codeCheck()
        this.newPasswordCheck()
        this.repeatPasswordCheck()

        // 如果通过所有检查，则发送请求
        if (this.notErr) {
          // 按钮显示加载
          this.loading = true

          setPassword({
            password: this.password,
            newPassword: this.newPassword,
            code: this.code
          }).then(res => {
            this.loading = false
            if (res.data.code === "1000") {
              this.$toast.success('密码修改成功')
              this.$emit("close");
            }
            if (res.data.code === "0003") this.passwordErr = "密码错误"
            if (res.data.code === "2001") this.codeErr = "验证码错误"
            if (res.data.code === "2000") this.$notify(res.data.message)
          }).catch(() => {
            this.loading = false
            this.$notify("无法连接到服务器")
          })

        }
      }
    }
  }
</script>

<style scoped>
  .button {
    width: 80%;
  }

  .myRow {
    padding-top: 30px;
    padding-bottom: 20px;
  }

  .setGroup {
    padding-top: 5px;
    padding-bottom: 10px;
  }
</style>