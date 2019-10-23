import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  access_token: null,
  exp: null
}

export default new Vuex.Store({
  state,
  mutations,
  getters: {
    getToken: state => {
      return state.access_token
    }
  },
  actions: {},
  modules: {}
})
