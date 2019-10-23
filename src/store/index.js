import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  access_token: null
}

export default new Vuex.Store({
  state,
  mutations: {
    upToken(state, token) {
      state.access_token = token
    }
  },
  getters: {
    getToken: state => {
      return state.access_token
    }
  },
  actions: {
  },
  modules: {
  }
})
