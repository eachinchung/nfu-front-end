<template>
  <div>
    <van-nav-bar
      class="title"
      title="成绩查询"
      left-arrow
      @click-left="$router.push('/main/home')"
    />
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        :success-text="successText"
      >
        <div :class="{ refresh: isRefresh }">
          <div ref="list">
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
                <van-cell
                  v-for="(item,index) in achievement"
                  :key="index"
                  class="cardItem"
                  :title="item.courseName"
                  :value="item.totalAchievements"
                  :label="item.subdivisionType"
                  @click="showAchievementList(item)"
                  is-link
                />
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
        </div>
      </van-pull-refresh>
  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {getAchievement, getTotalAchievement, updateAchievement, updateTotalAchievement} from "@/network/achievement";
  import {Picker, Popup, PullRefresh} from "vant";


  export default {
    data() {
      return {
        show: false,
        schoolYear: '2018',
        semester: '第二学期',
        semesterOJ: {\u7b2c\u4e00\u5b66\u671f: 1, \u7b2c\u4e8c\u5b66\u671f: 2},
        showList: false,
        showItem: {},
        isLoading: false,
        isRefresh: true,
        successText: null
      }
    },
    computed: {
      achievement() {
        let list = []
        for (let item of this.$store.state.achievement)
          if (item.schoolYear.toString() === this.schoolYear && item.semester === this.semesterOJ[this.semester])
            list.push(item)

        return list
      },
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
      [Picker.name]: Picker,
      [Popup.name]: Popup,
      [PullRefresh.name]: PullRefresh
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    mounted() {
      if (this.$store.state.totalAchievement == null && this.$store.state.achievement == null) {
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

            setTimeout(() => {
              this.isRefresh = window.innerHeight - 71 > this.$refs.list.offsetHeight
            }, 100)
          })
          .catch(() => {
            this.$notify("无法连接到服务器")
            this.$toast.clear()
          })
      } else if (this.$store.state.totalAchievement == null && this.$store.state.achievement != null) {
        this.$toast.loading({forbidClick: true, duration: 0})
        getTotalAchievement()
          .then(res => {
            if (res.data.code === "1000") this.$store.commit('setTotalAchievement', res.data.message)
            else this.$notify(res.data.message)

            this.$toast.clear()
            setTimeout(() => {
              this.isRefresh = window.innerHeight - 71 > this.$refs.list.offsetHeight
            }, 100)
          })
          .catch(() => {
            this.$notify("无法连接到服务器")
            this.$toast.clear()
          })
      }
      setTimeout(() => {
        this.isRefresh = window.innerHeight - 71 > this.$refs.list.offsetHeight
      }, 100)

    },
    methods: {
      onChange(picker, values) {
        picker.setColumnValues(1, this.$store.state.semesterList[values[0]])
      },
      onConfirm(value) {
        this.schoolYear = value[0]
        this.semester = value[1]
        this.show = false

        setTimeout(() => {
          this.isRefresh = window.innerHeight - 71 > this.$refs.list.offsetHeight
        }, 100)
      },
      showAchievementList(item) {
        this.showList = true
        this.showItem = item
      },
      onRefresh() {
        updateTotalAchievement()
          .then(res => {
            if (res.data.code === "1000") {
              this.$store.commit('setTotalAchievement', res.data.message)
              this.successText = "刷新成功"
            } else this.successText = res.data.message
            return updateAchievement()
          })
          .then(res => {
            if (res.data.code === "1000") {
              this.$store.commit('setAchievement', res.data.message)
              this.successText = "刷新成功"
            } else this.successText = res.data.message
            this.isLoading = false

            setTimeout(() => {
              this.isRefresh = window.innerHeight - 71 > this.$refs.list.offsetHeight
            }, 100)
          })
          .catch(() => {
            this.successText = "无法连接到服务器"
            this.isLoading = false
          })
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

  .refresh {
    height: calc(100vh - 71px);
  }
</style>