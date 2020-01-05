import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Cell, NavBar, Notify, Toast} from "vant"

Vue.use(Cell).use(NavBar).use(Notify).use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
