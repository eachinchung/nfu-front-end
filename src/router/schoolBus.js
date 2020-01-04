const Date = () => import('../views/SchoolBus/Date')
const Schedule = () => import('../views/SchoolBus/Schedule')
const Accelerate = () => import("../views/SchoolBus/Accelerate")
const PendingPaymentList = () => import("../views/SchoolBus/PendingPaymentList")
const WaitingRideList = () => import("../views/SchoolBus/WaitingRideList")
const Pay = () => import("../views/SchoolBus/Pay")
const ReturnTicket =() => import("../views/SchoolBus/ReturnTicket")

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
