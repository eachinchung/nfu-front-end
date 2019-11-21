<template>
  <div>
    <div class="setGroup">
      <van-cell-group title="两步验证">
        <van-field
          v-model="password"
          label="密码"
          placeholder="请输入密码"
        />
        <van-field
          v-model="verificationCode"
          center
          clearable
          label="邮箱验证码"
          placeholder="请输入验证码"
        >
          <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </div>

    <van-cell-group title="设置新密码">
      <van-field
        v-model="newPassword"
        label="新密码"
        placeholder="请输入新密码"
      />
      <van-field
        v-model="repeatPassword"
        label="确认密码"
        placeholder="请再次输入密码"
        :error-message="repeatPasswordErr"
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="myRow">
      <van-button type="warning" class="button" size="small">修改密码</van-button>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "SetPassword",
    data() {
      return {
        password: null,
        newPassword: null,
        repeatPassword: null,
        verificationCode: null,
        repeatPasswordErr: null
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