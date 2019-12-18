<template>
  <div>
    <van-nav-bar
      class="title"
      title="学分管理"
      left-arrow
      @click-left="$router.push('/main/home')"
    />
    <div v-if="achievement">
      <van-panel
        title="专业核心课"
        v-if="classification.professionalCore.length!==0"
        :status="`${total(classification.professionalCore)}`"
        class="group"
      >
        <div class="classList">
          <div v-for="(item,index) in classification.professionalCore" :key="index">
            <div :style="{float:'right'}">
              {{item.credit}}
            </div>
            {{item.courseName}}
          </div>
        </div>
      </van-panel>

      <van-panel
        title="专业方向课"
        v-if="classification.professionalDirection.length!==0"
        :status="`${total(classification.professionalDirection)}`"
        class="group"
      >
        <div class="classList">
          <div v-for="(item,index) in classification.professionalDirection" :key="index">
            <div :style="{float:'right'}">
              {{item.credit}}
            </div>
            {{item.courseName}}
          </div>
        </div>
      </van-panel>

      <van-panel
        title="专业选修课"
        v-if="classification.professionalElective.length!==0"
        :status="`${total(classification.professionalElective)}`"
        class="group"
      >
        <div class="classList">
          <div v-for="(item,index) in classification.professionalElective" :key="index">
            <div :style="{float:'right'}">
              {{item.credit}}
            </div>
            {{item.courseName}}
          </div>
        </div>
      </van-panel>

      <van-panel
        title="公共必修课"
        v-if="classification.publicCompulsory.length!==0"
        :status="`${total(classification.publicCompulsory)}`"
        class="group"
      >
        <div class="classList">
          <div v-for="(item,index) in classification.publicCompulsory" :key="index">
            <div :style="{float:'right'}">
              {{item.credit}}
            </div>
            {{item.courseName}}
          </div>
        </div>
      </van-panel>

      <van-panel
        title="成长必修课"
        v-if="classification.growingCompulsory.length!==0"
        :status="`${total(classification.growingCompulsory)}`"
        class="group"
      >
        <div class="classList">
          <div v-for="(item,index) in classification.growingCompulsory" :key="index">
            <div :style="{float:'right'}">
              {{item.credit}}
            </div>
            {{item.courseName}}
          </div>
        </div>
      </van-panel>

      <van-panel
        title="公共选修课"
        v-if="classification.publicElective.length!==0"
        :status="`${total(classification.publicElective)}`"
        class="group"
      >
        <div class="classList">
          <div v-for="(item,index) in classification.publicElective" :key="index">
            <div :style="{float:'right'}">
              {{item.credit}}
            </div>
            {{item.courseName}}
          </div>
        </div>
      </van-panel>
    </div>

  </div>
</template>

<script>
  import {checkLogin} from "@/network/token";
  import {getAchievement} from "@/network/achievement";
  import {Panel} from "vant";

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
    components: {[Panel.name]: Panel},
    beforeRouteEnter(to, from, next) {
      checkLogin(to, next)
    },
    data() {
      return {
        achievement: null,
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
  @import "~@/assets/css/common.css";

  .classList {
    padding: 10px 20px;
    font-size: 14px;
    color: #6e6f71;
  }
</style>