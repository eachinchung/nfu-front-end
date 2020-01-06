<template>
  <div>
    <van-dropdown-menu class="class-schedule-title">
      <van-dropdown-item v-model="week" :options="option"/>
    </van-dropdown-menu>

    <div v-if="downloadFinished">

      <!-- 课程表日期、星期 -->
      <div class="schedule-date">
        <div class="schedule-class-time-box" :style="{float: 'left'}"/>
        <div
          class="schedule-box-date"
          v-for="item in calendar[week]"
          :key="item.toLocaleDateString()"
        >
          <b>{{ weekdays[item.getDay()] }}</b><br>
          {{ `${item.getMonth()+1}-${item.getDate()}` }}
        </div>
      </div>

      <!-- 上课时间 -->
      <div class="schedule-class-time">
        <div
          class="schedule-class-time-box"
          v-for="(item,index) in classStartTime"
          :key="item.item"
        >
          <b>{{ index+1 }}</b><br>
          {{ item }}
        </div>
      </div>

      <!-- 课程 -->
      <div
        v-for="(dayItem,dayIndex) in classSchedule[week]"
        :key="dayIndex"
        class="day-list"
        :style="dayStyle(dayIndex)"
      >
        <div v-if="dayItem.length!==0">
          <div
            v-for="(item,index) in dayItem"
            :key="index"
            :style="classStyle(item.startNode,item.endNode,item.background)"
            class="schedule-class"
          >
            <div class="class-text" :style="textLine(item.startNode,item.endNode)">
              {{item.courseName}}
            </div>
            <div :style="{paddingLeft: '4px',paddingRight: '4px'}">
              {{`@${item.classroom}`}}
            </div>
          </div>
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
  import calendarModels from "@/assets/json/calendarModels"
  import classStartTime from "@/assets/json/classStartTime"
  import classScheduleModels from "@/assets/json/classScheduleModels"
  import scheduleBackground from "@/assets/json/scheduleBackground"

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
    },
    methods: {
      dayStyle,
      classStyle,
      textLine
    }
  }

  const vueData = {
    // 基础数据
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    classStartTime: classStartTime,
    downloadFinished: false,

    // 课程表数据
    calendar: null,
    classSchedule: classScheduleModels,

    // 下拉框数据
    week: 0,
    option: optionWeek
  }


  // 初始化
  function init(vm) {
    vm.$toast.loading({forbidClick: true, duration: 0})

    // 获取课程表的数据
    schoolConfig().then(res => {
      vm.week = handleWeek(res.data.message.schoolOpensTimestamp)
      vm.calendar = classCalendar(res.data.message.schoolOpensTimestamp)
      return getClassSchedule()
    }).then(res => {
      if (res.data.code === "1000") handleClassSchedule(vm, res.data.message)
      else vm.$notify(res.data.message)

      vm.$toast.clear()
    }).catch(() => {
      vm.$notify("无法连接到服务器")
      vm.$toast.clear()
    })
  }

  // 计算当前是第几周
  function handleWeek(timestamp) {
    const timestampInterval = new Date().getTime() - timestamp
    if (timestampInterval < 0) return 0

    const week = timestampInterval / 604800000
    if (week > 20) return 20
    return ~~week
  }

  // 课程日历
  function classCalendar(timestamp) {
    const schoolOpens = new Date(timestamp)
    const year = schoolOpens.getFullYear()
    const month = schoolOpens.getMonth()

    let day = schoolOpens.getDate()
    let calendar = calendarModels

    for (let i = 0; i < 20; i++) for (let j = 0; j < 7; j++)
      calendar[i][j] = new Date(year, month, day++)

    return calendar
  }

  // 处理课程表的数据
  function handleClassSchedule(vm, classList) {
    const weekdayModels = [1, 2, 3, 4, 5, 6, 0]
    // 课程按照上课时间的先后排序
    classList.sort((a, b) => a.startNode - b.startNode)

    for (const item of classList) for (let i = item.startWeek; i < item.endWeek; i++) {
      item.background = scheduleBackground[Math.floor(Math.random() * scheduleBackground.length)]
      vm.classSchedule[i][weekdayModels[item.weekday]].push(item)
    }

    vm.downloadFinished = true
  }

  // 计算课程方块的位置
  function dayStyle(dayIndex) {
    let day
    if (dayIndex === 0) day = 7
    else day = dayIndex

    return {left: `calc(12.85vw * ${day - 1} + 9vw)`,}
  }

  // 计算课程方块的高度
  function classStyle(start, end, background) {
    return {
      height: `calc(15vw * ${end - start + 1} - 0.6vw)`,
      top: `calc(15vw * ${start})`,
      background
    }
  }

  function textLine(start, end) {
    return {
      lineClamp: `${(end - start + 1) * 2}`
    }
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

  .schedule-box-date {
    float: left;
    height: 15vw;
    width: 12.85vw;
    text-align: center;
    font-size: 12px;
    color: #424242;
  }

  .schedule-class-time {
    position: absolute;
    z-index: -1;
    top: calc(15vw + 55px);
    left: 0;
  }

  .schedule-class-time-box {
    height: 15vw;
    width: 10vw;
    text-align: center;
    font-size: 12px;
    color: #424242;
  }

  .day-list {
    position: absolute;
    top: calc(15vw + 42px);
    font-size: 12px;
    z-index: -1;
  }

  .schedule-class {
    margin: 5px;
    box-shadow: 1px 1px 3px #929292;
    position: absolute;
    width: 12.25vw;
    font-size: 12px;
    border-radius: 5px;
    color: white;
  }

  .class-text {
    padding-top: 4px;
    padding-left: 4px;
    padding-right: 4px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    line-height: 16px;
  }

  .row {
    position: absolute;
    width: 100%;
    top: calc(15vw * 16 + 90px);
    height: 150px;
  }

  .button {
    width: 75%;
    border-radius: 8px;
  }
</style>
