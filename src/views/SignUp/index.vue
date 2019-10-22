<template>
  <div class="login">
    <van-nav-bar class="title" title="注册新用户" />
    <van-cell-group title="请输入教务系统账号" class="group">
      <van-field v-model="username" left-icon="contact" label="学号" placeholder="请输入学号" clearable />
      <van-field
        v-model="password"
        left-icon="edit"
        type="password"
        label="密码"
        placeholder="请输入密码"
        right-icon="question-o"
        @keyup.enter="login_btu"
        @click-right-icon="password_text"
      />
    </van-cell-group>

    <van-cell-group title="请设置个人信息" class="group">
      <van-field
        readonly
        clickable
        left-icon="location-o"
        label="宿舍"
        :value="value"
        placeholder="选择宿舍"
        @click="showPicker = true"
      />
      <van-field
        v-model="password"
        left-icon="edit"
        type="password"
        label="密码"
        placeholder="请输入密码"
        right-icon="question-o"
        @keyup.enter="login_btu"
        @click-right-icon="password_text"
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="row">
      <van-button type="primary" class="button">注册</van-button>
    </van-row>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
// import { login } from "@/network/login";
const citys = {
  中国: {
    浙江: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
    福建: ["福州", "厦门", "莆田", "三明", "泉州"]
  }
};

export default {
  data() {
    return {
      username: null,
      password: null,
      value: "",
      showPicker: false,
      columns: [
        {
          values: Object.keys(citys),
          className: "column1"
        },
        {
          values: Object.keys(citys["中国"]),
          className: "column2"
        },
        {
          values: citys["中国"]["浙江"],
          className: "column3"
        }
      ]
    };
  },
  methods: {
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    onConfirm(value) {
      console.log(value);
      this.value = value[0] + " " + value[1];
      this.showPicker = false;
    },
    password_text() {
      this.$dialog.alert({
        title: "密码说明",
        messageAlign: "left",
        message:
          "教务系统密码将作为账号默认密码。\n账号密码将采用哈希加密，本平台无权读取您的密码。"
      });
    },
    check_username() {
      if (this.username == null || this.username == "") {
        this.$notify("账号不能为空");
        return false;
      }
      if (this.password == null || this.password == "") {
        this.$notify("密码不能为空");
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
body {
  background: rgb(248, 248, 248);
}
.login .button {
  width: 90%;
}
.login .title {
  margin-bottom: 20px;
}
.login .group {
  margin-bottom: 15px;
}
.login .row {
  margin-bottom: 15px;
}
</style>

