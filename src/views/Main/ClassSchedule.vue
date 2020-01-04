<template>
  <div>
    <van-dropdown-menu class="title">
      <van-dropdown-item v-model="week" :options="option"/>
    </van-dropdown-menu>
  </div>
</template>

<script>
  import optionWeek from "@/assets/json/optionWeek"
  import {checkLogin} from "@/network/token"
  import {getClassSchedule, schoolConfig} from "@/network/classSchedule"
  import {DropdownItem, DropdownMenu} from 'vant'

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    components: {
      [DropdownMenu.name]: DropdownMenu,
      [DropdownItem.name]: DropdownItem
    },
    data() {
      return vueData
    },
    created() {
      init(this)
    }
  }

  const vueData = {
    // 课程表数据
    schoolOpensTimestamp: null,
    classSchedule: null,

    // 下拉框数据
    week: 0,
    option: optionWeek
  }


  // 初始化
  function init(vm) {
    vm.$toast.loading({forbidClick: true, duration: 0})

    // 获取课程表的数据
    schoolConfig().then(res => {
        vm.schoolOpensTimestamp = res.data.message.schoolOpensTimestamp
        return getClassSchedule()
      }).then(res => {
        if (res.data.code === "1000") {
          vm.classSchedule = res.data.message

        } else vm.$notify(res.data.message)

        vm.$toast.clear()
      }).catch(() => {
        vm.$notify("无法连接到服务器")
        vm.$toast.clear()
      })
  }
</script>

<style scoped>
  @import "~@/assets/css/card.css";
</style>
