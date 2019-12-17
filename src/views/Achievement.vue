<template>
  <div>
    <van-nav-bar
      class="title"
      title="成绩查询"
      left-arrow
      @click-left="$router.push('/main/home')"
    />
    <div v-if="achievement">
      <van-cell-group :style="{marginBottom:'20px'}">
        <van-cell
          title="平均成绩"
          :value="totalAchievement.averageAchievement"
        />
        <van-cell
          title="平均绩点"
          :value="totalAchievement.averageAchievementPoint"
        />
        <van-cell
          title="已选学分"
          :value="totalAchievement.selectedCredit"
        />
        <van-cell
          title="已获得学分"
          :value="totalAchievement.getCredit"
        />
      </van-cell-group>

      <div v-for="(item,index) in achievement" :key="index">
        <div v-for="(minItem,minIndex) in item" :key="minIndex">
          <van-panel :title="index"
                     :status="semester[minIndex]"
                     :style="{marginBottom:'20px'}">
                        <van-collapse v-model="activeNames[index]" :border="false" accordion>
                          <van-collapse-item
                            v-for="(classItem,classIndex) in minItem"
                            :title="classItem.courseName"
                            :key="classIndex"
                            :name="classIndex"
                            :value="classItem.totalAchievements"
                          >
                            获得绩点：{{classItem.achievementPoint}}<br>
                            课程学分：{{classItem.credit}}<br>
                            平时成绩：{{classItem.peacetimeAchievements}}<br>
                            期中成绩：{{classItem.midtermAchievements}}<br>
                            期末成绩：{{classItem.finalAchievements}}<br>
                            实践成绩：{{classItem.practiceAchievements}}<br>
                            总评成绩：{{classItem.totalAchievements}}
                            <div v-if="classItem.resitExam">
                              重修成绩：{{classItem.resitExamAchievementPoint}}
                            </div>
                          </van-collapse-item>
                        </van-collapse>
          </van-panel>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {getAchievement, getTotalAchievement} from "@/network/achievement";

  function init(vm, data) {

    let achievement = {}
    for (const item of data) achievement[item.schoolYear] = {}
    for (const item of data) achievement[item.schoolYear][item.semester] = []
    for (const item of data) achievement[item.schoolYear][item.semester].push(item)

    vm.achievement = achievement
  }


  export default {
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        achievement: null,
        totalAchievement: null,
        activeNames:[],
        semester: {1: '第一学期', 2: '第二学期'}
      }
    },
    created() {
      this.$toast.loading({forbidClick: true, duration: 0})
      getTotalAchievement()
        .then(res => {
          if (res.data.code === "1000") this.totalAchievement = res.data.message
          else this.$notify(res.data.message)
          return getAchievement()
        })
        .then(res => {
          if (res.data.code === "1000") init(this, res.data.message)
          else this.$notify(res.data.message)
          this.$toast.clear()
        })
        .catch(() => {
          this.$notify("无法连接到服务器")
          this.$toast.clear()
        })
    },
  }
</script>

<style scoped>
  @import "~@/assets/css/common.css";
</style>