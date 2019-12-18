<template>
  <van-cell-group title="请输入教务系统账号" class="group">
    <van-field
      v-model="username"
      left-icon="contact"
      label="学号"
      placeholder="请输入学号"
      clearable
      @input="onChange"
    />
    <van-field
      v-model="password"
      left-icon="edit"
      type="password"
      label="密码"
      placeholder="请输入密码"
      right-icon="question-o"
      @input="onChange"
      @click-right-icon="passwordText"
    />
  </van-cell-group>
</template>

<script>
  import {Dialog, Field} from "vant";

  export default {
    components: {[Field.name]: Field},
    data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      onChange() {
        this.$emit("getUser", [this.username, this.password])
      },
      passwordText() {
        Dialog.alert({
          title: "密码说明",
          messageAlign: "left",
          message:
            "教务系统密码将作为账号默认密码。\n账号密码将采用哈希加密，本平台无权读取您的密码。"
        }).then(() => {})
      }
    }
  }
</script>

<style scoped>
  .group {
    margin-bottom: 18px;
  }
</style>
