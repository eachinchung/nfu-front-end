import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  accessToken: null,
  busPower:true,

  routeId: null,
  busDate: null,
  ticketType: null
}

export default new Vuex.Store({
  state,
  mutations
})
