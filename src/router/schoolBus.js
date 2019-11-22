const Date = () => import('../views/SchoolBus/Date')
const Schedule = () => import('../views/SchoolBus/Schedule')
const BrushTicket = () => import("../views/SchoolBus/BrushTicket")
const NotUsedOrder = () => import("../views/SchoolBus/NotUsedOrder")
const Pay = () => import("../views/SchoolBus/Pay")

export default [
  {
    path: 'date',
    component: Date
  },
  {
    path: 'schedule',
    component: Schedule
  },
  {
    path: "notUsedOrder",
    component: NotUsedOrder
  },
  {
    path: 'order/brushTicket',
    component: BrushTicket
  },
  {
    path: "order/pay",
    component: Pay
  }
]
