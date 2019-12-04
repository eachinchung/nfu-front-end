import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button, Cell, CellGroup, Field, NavBar, Row, ActionSheet,
  Col, Notify, Toast, Dialog, Picker, Popup, Sticky, Collapse,
  DatetimePicker, Tag, Panel, Checkbox, CheckboxGroup, CollapseItem,
  PullRefresh, Step, Steps, Image, Loading, DropdownMenu, DropdownItem
} from "vant"

Vue.use(Row)
  .use(Col).use(Button).use(Cell).use(Collapse)
  .use(CellGroup).use(Field).use(NavBar).use(Loading)
  .use(Notify).use(Toast).use(Dialog).use(Picker)
  .use(Popup).use(Sticky).use(DatetimePicker).use(ActionSheet)
  .use(Tag).use(Panel).use(Checkbox).use(CheckboxGroup)
  .use(PullRefresh).use(Step).use(Steps).use(Image)
  .use(DropdownMenu).use(DropdownItem).use(CollapseItem)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
