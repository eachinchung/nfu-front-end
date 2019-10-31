import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  access_token: null,
  exp: null,
  user: null,

  route_id: null,
  passenger_ids: null,
  connect_id: null,
  date: null

}

export default new Vuex.Store({
  state,
  mutations
})
