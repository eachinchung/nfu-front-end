<template>
  <div class="profile">
    <van-nav-bar class="title" title="个人档案" />

    <van-cell-group title="账号信息" class="group">
      <van-cell size="large" icon="contact" title="账号" :value="user" />
      <van-cell size="large" icon="contact" title="姓名" :value="name" />
    </van-cell-group>

    <van-cell-group>
      <van-cell
        size="large"
        icon="location-o"
        title="宿舍"
        :value="dormitory"
        placeholder="选择宿舍"
        @click="showPicker = true"
        is-link
      />
      <van-cell
        size="large"
        icon="envelop-o"
        title="邮箱"
        :value="email"
        @click="$toast('该功能正在开发中...');"
        is-link
      />
    </van-cell-group>

    <van-row type="flex" justify="center" class="row">
      <van-button type="default" class="button" @click="$toast('该功能正在开发中...');">修改密码</van-button>
    </van-row>
    <van-row type="flex" justify="center">
      <van-button type="warning" class="button" @click="logout">退出登录</van-button>
    </van-row>

    <popup
      :showPicker="showPicker"
      @getRoomId="get_dormitory"
      @close="close"
      :dormitoryValue="dormitory"
    />
  </div>
</template>

<script>
import { get_user, update_dormitory } from "@/network/profile";
import {
  refresh_token,
  check_refresh_token,
  handle_token
} from "@/network/refresh_token";

import Popup from "@/components/dormitory_popup";

function init(token, vm) {
  get_user(token).then(
    res => {
      vm.user = res.data.id;
      vm.name = res.data.name;
      vm.email = res.data.email;
      vm.dormitory = res.data.dormitory;
    },
    () => {
      vm.$notify("无法连接到服务器");
    }
  );
}

export default {
  data() {
    return {
      user: null,
      name: null,
      email: null,
      dormitory: null,
      showPicker: false
    };
  },
  components: {
    Popup
  },
  // 判断用户有没有登录，并初始化
  beforeRouteEnter(to, from, next) {
    if (check_refresh_token()) {
      const token = refresh_token();
      if (token[0]) {
        next(vm => {
          token[1].then(
            res => {
              if (handle_token(res)) {
                init(vm.$store.state.access_token, vm);
              } else vm.$notify("不可预知错误");
            },
            () => vm.$notify("无法连接到服务器")
          );
        });
      } else next({ path: "/login", query: { next: to.fullPath } });
    } else
      next(vm => {
        if (vm.user == null) init(vm.$store.state.access_token, vm);
      });
  },

  methods: {
    logout() {
      document.cookie = "remember=;expires=-1;path=/";
      this.$store.commit("rmToken");
      this.$router.push("/login");
    },
    get_dormitory: function(room) {
      if (room[0] !== this.dormitory) {
        this.dormitory = room[0];

        update_dormitory(this.$store.state.access_token, room[1]).then(
          res => {
            if (!res.data.adopt)
              if (res.data.code === 1001) {
                const token = refresh_token();
                if (token[0])
                  token[1].then(
                    res => {
                      if (handle_token(res))
                        update_dormitory(
                          this.$store.state.access_token,
                          room[1]
                        );
                      else this.$notify("不可预知错误");
                    },
                    () => this.$notify("无法连接到服务器")
                  );
                else
                  this.$router.push({
                    path: "/login",
                    query: { next: this.$route.fullPath }
                  });
              }
          },
          () => this.$notify("无法连接到服务器")
        );
      }
    },
    close() {
      this.showPicker = false;
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
