import coursePreselection from "@/assets/json/coursePreselection"
import {getProfile} from "@/network/profile"
import {getAchievement} from "@/network/achievement"
import {Dialog} from 'vant'

import classTypeHash from '@/assets/json/classTypeHash'

export function created() {
  if (this.$store.state.profile == null && this.$store.state.achievement == null) {
    this.$toast.loading({forbidClick: true, duration: 0})
    getProfile().then(res => {
      if (res.data.code === "1000") initProfile(this, cachingProfile(this, res.data.message))
      else this.$notify(res.data.message)
      return getAchievement()
    }).then(res => {
      if (res.data.code === "1000") {
        this.$store.commit('setAchievement', res.data.message)
        initAchievement(this)
      } else this.$notify(res.data.message)
      this.loadedSuccessfully = true
      this.$toast.clear()
    }).catch((e) => {
      console.log(e);
      this.$notify("无法连接到服务器")
      this.$toast.clear()
    })
  } else if (this.$store.state.profile == null) {
    this.$toast.loading({forbidClick: true, duration: 0})
    getProfile().then(res => {
      if (res.data.code === "1000") {
        initProfile(this, cachingProfile(this, res.data.message))
        initAchievement(this)
      } else this.$notify(res.data.message)
      this.loadedSuccessfully = true
      this.$toast.clear()
    }).catch((e) => {
      console.log(e);
      this.$notify("无法连接到服务器")
      this.$toast.clear()
    })
  } else if (this.$store.state.achievement == null) {
    this.$toast.loading({forbidClick: true, duration: 0})
    getAchievement()
      .then(res => {
        if (res.data.code === "1000") {
          this.$store.commit('setAchievement', res.data.message)
          initProfile(this, this.$store.state.profile)
          initAchievement(this)
        } else this.$notify(res.data.message)
        this.$toast.clear()
      })
      .catch(() => {
        this.$notify("无法连接到服务器")
        this.$toast.clear()
      })
  } else {
    initProfile(this, this.$store.state.profile)
    initAchievement(this)
    this.loadedSuccessfully = true
  }
}

function cachingProfile(vm, res) {
  res.pro = vm.trainingPlan[res.grade][res.profession] != null
  vm.$store.commit('setProfile', res)
  return res
}

function initProfile(vm, res) {
  vm.pro = res.pro
  vm.grade = res.grade
  vm.college = res.college
  vm.profession = res.profession
  vm.direction = res.direction
}

function initAchievement(vm) {

  const creditProData = {
    professionalElective: {},   // 专业选修
    professionalDirection: {},  // 专业方向
    professionalCore: {},       // 专业核心
    publicElective: {},         // 公共选修
    publicCompulsory: {},       // 公共必修
    growingCompulsory: {},      // 成长必修
    failSubject: {},            // 挂科科目
    matchFailed: {}             // 匹配失败
  }

  const creditCountData = {
    professionalElective: 0,   // 专业选修
    professionalDirection: 0,  // 专业方向
    professionalCore: 0,       // 专业核心
    publicElective: 0,         // 公共选修
    publicCompulsory: 0,       // 公共必修
    growingCompulsory: 0,      // 成长必修
    failSubject: 0,            // 挂科科目
    matchFailed: 0             // 匹配失败
  }

  // 增加本学期课程
  if (vm.pro) {
    let classList = localStorage.getItem("classList")
    if (classList == null) {
      Dialog.alert({
        title: '匹配本学期课程',
        message: '检测到您已有匹配本学期课程的资格，\n请前往课程表页面获取本学期已选课程。',
        messageAlign: 'left',
        confirmButtonText: '前往',
        showCancelButton: true,
      }).then(() => {
        vm.$router.push('/main/class-schedule')
      }).catch(() => {
        // on cancel
      })
    } else {
      classList = JSON.parse(classList)
      for (let item of Object.keys(classList)) {
        const subdivisionType = coursePreselection[vm.grade][vm.profession][vm.direction][item]
        const classData = {
          courseName: item,
          credit: classList[item],
          subdivisionType: subdivisionType,
          accomplish: false
        }
        if (subdivisionType == null) {
          creditProData.matchFailed[item] = classData
          creditCountData.matchFailed += classData.credit
        } else {
          try {
            creditProData[classTypeHash[subdivisionType]][item] = classData
            creditCountData[classTypeHash[subdivisionType]] += classData.credit
          } catch (e) {
            creditProData.matchFailed[item] = classData
            creditCountData.matchFailed += classData.credit
          }
        }
      }
    }
  }

  for (const item of vm.$store.state.achievement) {
    // 去除挂科的课程
    if (item.totalAchievements < 60 && (item.resitExamAchievementPoint == null || item.resitExamAchievementPoint < 60)) {
      creditProData.failSubject[item.courseName] = item
      creditCountData.failSubject += item.credit
      continue
    }

    try {
      item.accomplish = true
      let courseType = classTypeHash[item.subdivisionType]
      if (courseType == null) courseType = classTypeHash[item.courseType]

      creditProData[courseType][item.courseName] = item
      creditCountData[courseType] += item.credit
    } catch (e) {
      creditProData.matchFailed[item.courseName] = item
      creditCountData.matchFailed += item.credit
    }
  }

  vm.$store.commit('setCreditPro', creditProData)
  vm.$store.commit('setCreditCount', creditCountData)
}