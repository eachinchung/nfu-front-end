const Date = () => import('../views/SchoolBus/Date')
const Schedule = () => import('../views/SchoolBus/Schedule')
const Accelerate = () => import("../views/SchoolBus/Accelerate")
const PendingPaymentList = () => import("../views/SchoolBus/PendingPaymentList")
const WaitingRideList = () => import("../views/SchoolBus/WaitingRideList")
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
    path: "order/list/pendingPayment",
    component: PendingPaymentList
  },
  {
    path: "order/list/waitingRide",
    component: WaitingRideList
  },
  {
    path: 'order/accelerate',
    component: Accelerate
  },
  {
    path: "order/pay",
    component: Pay
  }
]
