<template>
  <div>
    <van-dropdown-menu class="title">
      <van-dropdown-item v-model="week" :options="option"/>
    </van-dropdown-menu>

    <div v-if="init">
      <div v-for="(item,index) in weekData" :key="index">
        <van-panel v-if="item.length!==0" :title="schoolDate[week][index]" :status="weekdays[item[0].weekday]"
                   class="mygroup">
          <van-collapse v-model="activeNames[index]" :border="false" accordion>
            <van-collapse-item
              v-for="(item,index) in item"
              :title="item.courseName"
              :key="index"
              :name="index"
              :value="item.classroom"
              :label="item.time"
            >
              上课周次：{{item.classWeek}}<br>
              上课时间：{{item.time}}<br>
              上课地点：{{item.classroom}}<br>
              任课教师：{{item.teacher.toString()}}
            </van-collapse-item>
          </van-collapse>
        </van-panel>
      </div>
    </div>

    <div :style="{height:'65px'}"></div>
  </div>
</template>

<script>
  import {checkLogin} from "../../network/token"
  import {getClassSchedule, schoolConfig} from "../../network/classSchedule"
  import {DropdownItem, DropdownMenu} from 'vant'

  const times = [
    ['08:00', '08:40'],
    ['08:50', '09:30'],
    ['09:45', '10:25'],
    ['10:35', '11:15'],
    ['11:20', '12:00'],
    ['12:50', '13:30'],
    ['13:40', '14:20'],
    ['14:30', '15:10'],
    ['15:15', '15:55'],
    ['16:10', '16:50'],
    ['16:55', '17:35'],
    ['18:45', '19:25'],
    ['19:30', '20:10'],
    ['20:15', '20:55'],
    ['21:05', '21:45']
  ]

  function dataHandling(vm, classSchedule) {
    classSchedule.sort((a, b) => a.startNode - b.startNode)
    for (let item of classSchedule) {
      for (let i = item.startWeek; i <= item.endWeek; i++)
        vm.classSchedule[i].push({
          courseName: item.courseName,
          classroom: item.classroom,
          weekday: item.weekday,
          classWeek: `${item.startWeek + 1} ~ ${item.endWeek + 1}`,
          time: `${times[item.startNode][0]} ~ ${times[item.endNode][1]}`,
          teacher: item.teacher
        })
    }
  }

  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    components: {
      [DropdownMenu.name]: DropdownMenu, [DropdownItem.name]: DropdownItem
    },
    data() {
      return {
        init: false,
        week: 0,
        option: [
          {text: '第一周', value: 0},
          {text: '第二周', value: 1},
          {text: '第三周', value: 2},
          {text: '第四周', value: 3},
          {text: '第五周', value: 4},
          {text: '第六周', value: 5},
          {text: '第七周', value: 6},
          {text: '第八周', value: 7},
          {text: '第九周', value: 8},
          {text: '第十周', value: 9},
          {text: '第十一周', value: 10},
          {text: '第十二周', value: 11},
          {text: '第十三周', value: 12},
          {text: '第十四周', value: 13},
          {text: '第十五周', value: 14},
          {text: '第十六周', value: 15},
          {text: '第十七周', value: 16},
          {text: '第十八周', value: 17},
          {text: '第十九周', value: 18},
          {text: '第二十周', value: 19}
        ],
        schoolOpens: null,
        classSchedule: [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
        weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'],
        activeNames: []
      }
    },
    computed: {
      weekData() {
        let data = [[], [], [], [], [], [], []]
        for (let item of this.classSchedule[this.week]) data[item.weekday].push(item)
        return data
      },
      schoolDate() {
        let date = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]
        const schoolOpens = this.schoolOpens.split("-")
        const year = parseInt(schoolOpens[0])
        const month = parseInt(schoolOpens[1]) - 1
        let day = parseInt(schoolOpens[2])
        for (let i = 0; i < 20; i++)
          for (let j = 0; j < 7; j++) {
            const theDay = new Date(year, month, day)
            date[i][j] = `${theDay.getFullYear()}-${(theDay.getMonth() + 1).toString().padStart(2, "0")}-${theDay.getDate().toString().padStart(2, "0")}`
            day++
          }
        return date
      }
    },
    created() {
      this.$toast.loading({forbidClick: true, duration: 0})

      schoolConfig()
        .then(res => {
          this.week = res.data.message.schoolWeek
          this.schoolOpens = res.data.message.schoolOpens
          return getClassSchedule()
        })
        .then(res => {
          if (res.data.code === "1000") dataHandling(this, res.data.message)
          else this.$notify(res.data.message)
          this.init = true
          this.$toast.clear()
        })
        .catch(() => {
          this.$notify("服务器通信错误")
          this.$toast.clear()
        })

    }
  }
</script>

<style scoped>
  .title {
    margin-bottom: 25px;
    z-index: 99;
  }

  .mygroup {
    margin-bottom: 20px;
  }
</style>
