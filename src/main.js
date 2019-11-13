import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button, Cell, CellGroup, Field, NavBar, Row,
  Col, Notify, Toast, Dialog, Picker, Popup, Sticky,
  DatetimePicker, Tag, Panel, Checkbox, CheckboxGroup,
  PullRefresh, Step, Steps, Image, Loading
} from "vant"

Vue.use(Row)
  .use(Col).use(Button).use(Cell)
  .use(CellGroup).use(Field).use(NavBar).use(Loading)
  .use(Notify).use(Toast).use(Dialog).use(Picker)
  .use(Popup).use(Sticky).use(DatetimePicker)
  .use(Tag).use(Panel).use(Checkbox).use(CheckboxGroup)
  .use(PullRefresh).use(Step).use(Steps).use(Image);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
