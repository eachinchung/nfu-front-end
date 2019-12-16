import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button, Cell, CellGroup, Field, NavBar, Row,
  Col, Notify, Toast, Dialog, Picker, Popup, Collapse,
  Tag, Panel, CollapseItem,
  PullRefresh, Step, Steps, Image, Loading
} from "vant"

Vue.use(Col).use(Button).use(Cell).use(Collapse).use(CellGroup)
  .use(Field).use(NavBar).use(Loading).use(Notify).use(Toast)
  .use(Dialog).use(Picker).use(Popup).use(Row)
  .use(Tag).use(Panel)
  .use(PullRefresh).use(Step).use(Steps).use(Image)
  .use(CollapseItem)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
