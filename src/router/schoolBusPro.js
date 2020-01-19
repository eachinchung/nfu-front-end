const Date = () => import('../views/SchoolBusPro/Date')
const Schedule = () => import('../views/SchoolBusPro/Schedule')
const Accelerate = () => import("../views/SchoolBusPro/Accelerate")
const PendingPaymentList = () => import("../views/SchoolBusPro/PendingPaymentList")
const WaitingRideList = () => import("../views/SchoolBusPro/WaitingRideList")
const Pay = () => import("../views/SchoolBusPro/Pay")
const ReturnTicket = () => import("../views/SchoolBusPro/ReturnTicket")

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
