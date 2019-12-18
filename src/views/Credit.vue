<template>
  <div>
    <van-nav-bar
      title="学分查询"
      :border="false"
      left-arrow
      @click-left="$router.push('/main/home')"
    />
    <div v-if="achievement">
      <van-tabs
        v-model="active"
        sticky
        swipeable
        animated
      >
        <van-tab title="专业课">
          <div :style="{height:'20px'}"></div>

          <div class="card">
            <van-cell
              v-if="classification.professionalCore.length!==0"
              title="专业核心课"
              :value="`${total(classification.professionalCore)}`"
              class="cardItem"
            />
            <van-cell
              v-if="classification.professionalDirection.length!==0"
              title="专业方向课"
              :value="`${total(classification.professionalDirection)}`"
              class="cardItem"
            />
            <van-cell
              v-if="classification.professionalElective.length!==0"
              title="专业选修课"
              :value="`${total(classification.professionalElective)}`"
              class="cardItem"
            />
          </div>

          <div class="card" v-if="classification.professionalCore.length!==0">
            <van-cell
              v-for="(item,index) in classification.professionalCore"
              :key="index"
              :title="item.courseName"
              :value="item.credit"
              :label="item.subdivisionType"
              class="cardItem"
            />
          </div>


          <div
            v-if="classification.professionalDirection.length!==0"
            class="card"
          >
            <van-cell
              v-for="(item,index) in classification.professionalDirection"
              :key="index"
              :title="item.courseName"
              :value="item.credit"
              :label="item.subdivisionType"
              class="cardItem"
            />
          </div>

          <div
            v-if="classification.professionalElective.length!==0"
            class="card"
          >
            <van-cell
              v-for="(item,index) in classification.professionalElective"
              :key="index"
              :title="item.courseName"
              :value="item.credit"
              class="cardItem"
              :label="item.subdivisionType"
            />
          </div>
        </van-tab>

        <van-tab title="公共课">
          <div :style="{height:'20px'}"></div>

          <div class="card">
            <van-cell
              v-if="classification.publicCompulsory.length!==0"
              title="公共必修课"
              :value="`${total(classification.publicCompulsory)}`"
              class="cardItem"
            />
            <van-cell
              v-if="classification.growingCompulsory.length!==0"
              title="成长必修课"
              :value="`${total(classification.growingCompulsory)}`"
              class="cardItem"
            />
            <van-cell
              v-if="classification.publicElective.length!==0"
              title="公共选修课"
              :value="`${total(classification.publicElective)}`"
              class="cardItem"
            />
          </div>

          <div
            v-if="classification.publicCompulsory.length!==0"
            class="card"
          >
            <van-cell
              v-for="(item,index) in classification.publicCompulsory"
              :key="index"
              :title="item.courseName"
              :value="item.credit"
              :label="item.subdivisionType"
              class="cardItem"
            />
          </div>

          <div
            v-if="classification.growingCompulsory.length!==0"
            class="card"
          >
            <van-cell
              v-for="(item,index) in classification.growingCompulsory"
              :key="index"
              :title="item.courseName"
              :value="item.credit"
              :label="item.subdivisionType"
              class="cardItem"
            />
          </div>

          <div
            v-if="classification.publicElective.length!==0"
            class="card"
          >
            <van-cell
              v-for="(item,index) in classification.publicElective"
              :key="index"
              :title="item.courseName"
              :value="item.credit"
              :label="item.subdivisionType"
              class="cardItem"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {getAchievement} from "@/network/achievement";
  import {Tab, Tabs} from "vant";

  function init(vm, res) {
    if (res.data.code === "1000") vm.achievement = res.data.message
    else vm.$notify(res.data.message)
    vm.$toast.clear()
  }

  function initAchievement(vm) {
    let classification = {
      professionalElective: [], // 专业选修
      professionalDirection: [],  // 专业方向
      professionalCore: [], // 专业核心
      publicElective: [], // 公共选修
      publicCompulsory: [], // 公共必修
      growingCompulsory: []  // 成长必修
    }
    for (const item of vm.achievement) {
      // 去除挂科的课程
      if (item.totalAchievements < 60) {
        if (!item.resitExam) continue
        else if (item.resitExamAchievementPoint < 60) continue
      }

      if (item.courseType === '专业选修') classification.professionalElective.push(item)
      if (item.courseType === '专业必修') {
        if (item.subdivisionType === '专业方向课') classification.professionalDirection.push(item)
        if (item.subdivisionType === '专业核心课') classification.professionalCore.push(item)
      }
      if (item.courseType === '公共必修') classification.publicCompulsory.push(item)
      if (item.courseType === '公共选修') classification.publicElective.push(item)
      if (item.courseType === '成长必修') classification.growingCompulsory.push(item)
    }
    return classification
  }

  export default {
    components: {
      [Tab.name]: Tab,
      [Tabs.name]: Tabs
    },
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        achievement: null,
        active: 0
      }
    },
    computed: {
      classification() {
        return initAchievement(this)
      }
    },
    created() {
      this.$toast.loading({forbidClick: true, duration: 0})
      getAchievement()
        .then(res => init(this, res))
        .catch(() => {
          this.$notify("无法连接到服务器")
          this.$toast.clear()
        })
    },
    methods: {
      total(classType) {
        let count = 0;
        for (const item of classType) count += item.credit
        return count
      }
    }
  }
</script>

<style scoped>

  .card {
    background: #ffffff;
    border-radius: 8px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .cardItem {
    border-radius: 8px;
  }
</style>