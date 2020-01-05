<template>
  <div>
    <van-dropdown-menu class="class-schedule-title">
      <van-dropdown-item v-model="week" :options="option"/>
    </van-dropdown-menu>

    <div v-if="calendar">
      <div class="schedule-date">
        <div class="schedule-box schedule-box-date"/>
        <div
          class="schedule-box schedule-box-date"
          v-for="item in calendar[week]"
          :key="item.toLocaleDateString()"
        >
          <b>{{ weekdays[item.getDay()] }}</b><br>
          {{ `${item.getMonth()+1}-${item.getDate()}` }}
        </div>
      </div>

      <div class="schedule-class-time">
        <div
          class="schedule-box"
          v-for="(item,index) in classTime"
          :key="item.item"
        >
          <b>{{ index+1 }}</b><br>
          {{ item }}
        </div>

      </div>

      <van-row type="flex" justify="center" class="row">
        <van-button type="default" class="button">重置课程表</van-button>
      </van-row>

    </div>
  </div>
</template>

<script>
  import optionWeek from "@/assets/json/optionWeek"
  import {checkLogin} from "@/network/token"
  import {getClassSchedule, schoolConfig} from "@/network/classSchedule"
  import {Button, DropdownItem, DropdownMenu, Row} from 'vant'

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    components: {
      [DropdownMenu.name]: DropdownMenu,
      [DropdownItem.name]: DropdownItem,
      [Button.name]: Button,
      [Row.name]: Row
    },
    data() {
      return vueData
    },
    created() {
      init(this)
    }
  }

  const vueData = {
    // 基础数据
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    classTime: ["08:00", "08:50", "09:45", "10:35", "11:20", "12:50", "13:40", "14:30", "15:15", "16:10", "16:55", "18:45", "19:30", "20:15", "21:05"],

    // 课程表数据
    calendar: null,
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
      vm.calendar = classCalendar(res.data.message.schoolOpensTimestamp)
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

  // 课程日历
  function classCalendar(timestamp) {
    const schoolOpens = new Date(timestamp)
    const year = schoolOpens.getFullYear()
    const month = schoolOpens.getMonth()

    let day = schoolOpens.getDate()
    let calendar = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]

    for (let i = 0; i < 20; i++)
      for (let j = 0; j < 7; j++)
        calendar[i][j] = new Date(year, month, day++)

    return calendar
  }

</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .class-schedule-title {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }

  .schedule-date {
    position: absolute;
    top: 58px;
    z-index: -1;
  }

  .schedule-class-time {
    position: absolute;
    z-index: -1;
    top: calc(12.5vw + 58px);
    left: 0;
  }

  .schedule-box {
    height: 12.5vw;
    width: 12.5vw;
    text-align: center;
    font-size: 12px;
  }

  .schedule-box-date {
    float: left;
  }

  .row {
    position: absolute;
    width: 100%;
    top: calc(12.5vw * 16 + 95px);
    height: 150px;
  }

  .button {
    width: 75%;
    border-radius: 5px;
  }
</style>
