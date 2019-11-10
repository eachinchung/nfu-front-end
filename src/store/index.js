import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  access_token: null,
  exp: null,
  user: null,

  route_id: null,
  bus_date: null,
  ticket_type: 1,
  ticket_data: null

}

export default new Vuex.Store({
  state,
  mutations
})
