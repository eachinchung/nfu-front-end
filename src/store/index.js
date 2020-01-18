import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  accessToken: null,
  busPower: true,

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
