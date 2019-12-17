import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Cell, CellGroup, Field, NavBar, Row,
  Col, Notify, Toast, Dialog, Panel
} from "vant"

Vue.use(Col).use(Cell).use(CellGroup)
  .use(Field).use(NavBar).use(Notify).use(Toast)
  .use(Dialog).use(Row).use(Panel)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
