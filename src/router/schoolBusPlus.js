const Date = () => import('../views/SchoolBusPlus/Date')
const Schedule = () => import('../views/SchoolBusPlus/Schedule')
const Accelerate = () => import("../views/SchoolBusPlus/Accelerate")
const PendingPaymentList = () => import("../views/SchoolBusPlus/PendingPaymentList")
const WaitingRideList = () => import("../views/SchoolBusPlus/WaitingRideList")
const Pay = () => import("../views/SchoolBusPlus/Pay")
const ReturnTicket =() => import("../views/SchoolBusPlus/ReturnTicket")

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
    path: "order/list/pending-payment",
    component: PendingPaymentList
  },
  {
    path: "order/list/waiting-ride",
    component: WaitingRideList
  },
  {
    path: 'order/accelerate',
    component: Accelerate
  },
  {
    path: "order/pay",
    component: Pay
  },
  {
    path:'order/return-ticket',
    component:ReturnTicket
  }
]
