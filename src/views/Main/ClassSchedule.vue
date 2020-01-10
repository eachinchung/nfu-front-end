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
          <div class="schedule-class-time-text">
            <b>{{ index+1 }}</b><br>
            {{ item }}
          </div>

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
            @click="showPopup(item)"
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

      <van-popup v-model="show" round>
        <div class="popup-card">
          <van-cell
            title="课程名称"
            :value="showCourseName"
          />
          <van-cell
            title="上课周次"
            :value="showClassWeek"
          />
          <van-cell
            title="上课时间"
            :value="showClassTime"
          />
          <van-cell
            title="上课地点"
            :value="showClassroom"
          />
          <van-cell
            title="任课教师"
            :value="showClassTeacher"
          />
        </div>
      </van-popup>

    </div>
  </div>
</template>

<script>
  import optionWeek from "@/assets/json/optionWeek"
  import classTimes from "@/assets/json/classTimes"
  import calendarModels from "@/assets/json/calendarModels"
  import classStartTime from "@/assets/json/classStartTime"
  import classScheduleModels from "@/assets/json/classScheduleModels"
  import scheduleBackground from "@/assets/json/scheduleBackground"

  import {checkLogin} from "@/network/token"
  import {getClassSchedule, schoolConfig} from "@/network/classSchedule"
  import {Button, DropdownItem, DropdownMenu, Popup, Row} from 'vant'


  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    components: {
      [DropdownMenu.name]: DropdownMenu,
      [DropdownItem.name]: DropdownItem,
      [Button.name]: Button,
      [Popup.name]: Popup,
      [Row.name]: Row
    },
    data() {
      return vueData
    },
    created,
    methods: {
      dayStyle,
      classStyle,
      textLine,
      showPopup
    }
  }

  const vueData = {
    // 下拉框数据
    week: 0,
    option: optionWeek,

    // 基础数据
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    classStartTime: classStartTime,
    downloadFinished: false,
    show: false,

    // 课程表数据
    calendar: null,
    classSchedule: classScheduleModels,

    // 展示数据
    showCourseName: null,
    showClassroom: null,
    showClassTime: null,
    showClassWeek: null,
    showClassTeacher: null
  }

  // 初始化
  function created() {
    this.$toast.loading({forbidClick: true, duration: 0})

    // 获取课程表的数据
    schoolConfig().then(res => {
      this.week = handleWeek(res.data.message.schoolOpensTimestamp)
      this.calendar = classCalendar(res.data.message.schoolOpensTimestamp)
      return getClassSchedule()
    }).then(res => {
      if (res.data.code === "1000") handleClassSchedule(this, res.data.message)
      else this.$notify(res.data.message)

      this.$toast.clear()
    }).catch(() => {
      this.$notify("无法连接到服务器")
      this.$toast.clear()
    })
  }

  function showPopup(item) {
    this.show = true
    this.showCourseName = item.courseName
    this.showClassroom = item.classroom
    this.showClassTime = `${classTimes[item.startNode][0]} ~ ${classTimes[item.endNode][1]}`
    this.showClassWeek = `${item.startWeek + 1} ~ ${item.endWeek + 1}`
    this.showClassTeacher = item.teacher.toString()
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

    return {left: `calc(((100vw - 46px) / 7) * ${day - 1} + 43px)`}
  }

  // 计算课程方块的高度
  function classStyle(start, end, background) {
    return {
      height: `calc(15vw * ${end - start + 1} - 3px)`,
      top: `calc(15vw * ${start} + 3px)`,
      background
    }
  }

  // 课程名称超过多少行省略
  function textLine(start, end) {
    return {
      lineClamp: `${(end - start + 1) * 2}`
    }
  }

</script>

<style scoped>
  @import "~@/assets/css/card.css";

  /*标题*/
  .class-schedule-title {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
  }

  /*日期共用定位*/
  .schedule-date {
    position: absolute;
    top: 58px;
    z-index: -1;
  }

  /*日期箱子*/
  .schedule-box-date {
    float: left;
    height: 15vw;
    width: calc(((100vw - 46px) / 7));
    text-align: center;
    font-size: 12px;
    color: #424242;
  }

  /*上课时间共用定位*/
  .schedule-class-time {
    position: absolute;
    z-index: -1;
    top: 102px;
  }

  /*时间箱子*/
  .schedule-class-time-box {
    height: 15vw;
    width: 46px;
    display: flex;
  }

  /*上课时间*/
  .schedule-class-time-text {
    text-align: center;
    align-self: center;
    color: #424242;
    font-size: 12px;
    width: 100%;
  }

  /*每一天的定位*/
  .day-list {
    position: absolute;
    top: 95px;
    font-size: 12px;
    z-index: -1;
  }

  /*课程的箱子*/
  .schedule-class {
    margin: 5px;
    box-shadow: 1px 1px 3px #929292;
    position: absolute;
    width: calc(((100vw - 45px) / 7) - 3px);
    font-size: 12px;
    border-radius: 5px;
    color: white;
  }

  /*课程*/
  .class-text {
    padding-top: 4px;
    padding-left: 4px;
    padding-right: 4px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    line-height: 16px;
  }

  .popup-card {
    background: #ffffff;
    width: 90vw;
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
