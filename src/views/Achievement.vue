<template>
  <div>
    <van-nav-bar
      class="title"
      title="成绩查询"
      left-arrow
      @click-left="$router.push('/main/home')"
    />
    <div v-if="$store.state.totalAchievement&&$store.state.achievement">
      <div class="card">
        <van-cell
          class="cardItem"
          title="平均成绩"
          :value="$store.state.totalAchievement.averageAchievement"
        />
        <van-cell
          class="cardItem"
          title="平均绩点"
          :value="$store.state.totalAchievement.averageAchievementPoint"
        />
        <van-cell
          class="cardItem"
          title="已选学分"
          :value="$store.state.totalAchievement.selectedCredit"
        />
        <van-cell
          class="cardItem"
          title="已获得学分"
          :value="$store.state.totalAchievement.getCredit"
        />
      </div>

      <div class="card">
        <van-cell
          class="cardItem"
          :title="schoolYear"
          :value="semester"
          @click="show=true"
          is-link
        />
      </div>

      <div class="card">
        <div v-for="(item,index) in $store.state.achievement" :key="index">
          <van-cell
            class="cardItem"
            v-if="item.schoolYear.toString()===schoolYear&&item.semester===semesterOJ[semester]"
            :title="item.courseName"
            :value="item.totalAchievements"
            :label="item.subdivisionType"
            @click="showAchievementList(item)"
            is-link
          />
        </div>

      </div>

      <van-popup
        v-model="show"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="show=false"
          @confirm="onConfirm"
          @change="onChange"
        />
      </van-popup>

      <van-popup
        v-model="showList"
        round
      >
        <div class="popup-card">
          <van-cell
            title="获得绩点"
            :value="showItem.achievementPoint"
          />
          <van-cell
            title="课程学分"
            :value="showItem.credit"
          />
          <van-cell
            v-if="showItem.peacetimeAchievements!==0"
            title="平时成绩"
            :value="showItem.peacetimeAchievements"
          />
          <van-cell
            v-if="showItem.midtermAchievements!==0"
            title="期中成绩"
            :value="showItem.midtermAchievements"
          />
          <van-cell
            v-if="showItem.finalAchievements!==0"
            title="期末成绩"
            :value="showItem.finalAchievements"
          />
          <van-cell
            v-if="showItem.practiceAchievements!==0"
            title="实践成绩"
            :value="showItem.practiceAchievements"
          />
          <van-cell
            class="cardItem"
            title="总评成绩"
            :value="showItem.totalAchievements"
          />
          <van-cell
            class="cardItem"
            title="重修成绩"
            v-if="showItem.resitExam"
            :value="showItem.resitExamAchievementPoint"
          />
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {getAchievement, getTotalAchievement} from "@/network/achievement";
  import {Collapse, CollapseItem, Picker, Popup} from "vant";


  export default {
    data() {
      return {
        show: false,
        schoolYear: "2018",
        semester: '第二学期',
        semesterOJ: {\u7b2c\u4e00\u5b66\u671f: 1, \u7b2c\u4e8c\u5b66\u671f: 2},
        showList: false,
        showItem: {}
      }
    },
    computed: {
      columns() {
        const schoolYear = Object.keys(this.$store.state.semesterList)
        const theSchoolYearIndex = schoolYear.length - 1

        const theSemester = this.$store.state.semesterList[schoolYear[theSchoolYearIndex]]
        const theSemesterIndex = theSemester.length - 1

        return [
          {
            values: schoolYear,
            defaultIndex: theSchoolYearIndex
          },
          {
            values: theSemester,
            defaultIndex: theSemesterIndex
          }
        ]

      }
    },
    components: {
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Picker.name]: Picker,
      [Popup.name]: Popup
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    created() {
      this.$toast.loading({forbidClick: true, duration: 0})
      getTotalAchievement()
        .then(res => {
          if (res.data.code === "1000") this.$store.commit('setTotalAchievement', res.data.message)
          else this.$notify(res.data.message)
          return getAchievement()
        })
        .then(res => {
          if (res.data.code === "1000") this.$store.commit('setAchievement', res.data.message)
          else this.$notify(res.data.message)
          this.$toast.clear()
        })
        .catch(() => {
          this.$notify("无法连接到服务器")
          this.$toast.clear()
        })
    },
    methods: {
      onChange(picker, values) {
        picker.setColumnValues(1, this.$store.state.semesterList[values[0]])
      },
      onConfirm(value) {
        this.schoolYear = value[0]
        this.semester = value[1]
        this.show = false
      },
      showAchievementList(item) {
        this.showList = true
        this.showItem = item
      }
    }
  }
</script>

<style scoped>
  @import "~@/assets/css/card.css";

  .popup-card {
    background: #ffffff;
    width: 90vw;
  }
</style>