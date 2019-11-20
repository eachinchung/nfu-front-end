import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  accessToken: null,
  busPower:null,

  routeId: null,
  busDate: null,
  ticketType: 1,
  ticketData: null
}

export default new Vuex.Store({
  state,
  mutations
})
