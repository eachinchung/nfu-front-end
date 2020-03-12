import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  accessToken: null,

  profile: null,
  creditPro: {
    professionalElective: {},   // 专业选修
    professionalDirection: {},  // 专业方向
    professionalCore: {},       // 专业核心
    publicElective: {},         // 公共选修
    publicCompulsory: {},       // 公共必修
    growingCompulsory: {},      // 成长必修
    failSubject: {},            // 挂科科目
    matchFailed: {}             // 匹配失败
  },
  creditCount: {
    professionalElective: 0,   // 专业选修
    professionalDirection: 0,  // 专业方向
    professionalCore: 0,       // 专业核心
    publicElective: 0,         // 公共选修
    publicCompulsory: 0,       // 公共必修
    growingCompulsory: 0,      // 成长必修
    failSubject: 0,            // 挂科科目
    matchFailed: 0             // 匹配失败
  },

  achievement: null,
  semesterList: null,
  totalAchievement: null,

  routeId: null,
  busDate: null,
  ticketType: null
}

export default new Vuex.Store({
  state,
  mutations
})
