const Date = () => import('../views/SchoolBus/Date')
const Schedule = () => import('../views/SchoolBus/Schedule')
const BrushTicket = () => import("../views/SchoolBus/BrushTicket")
const PendingPayment = () => import("../views/SchoolBus/PendingPayment")
const WaitingRideOrder = () => import("../views/SchoolBus/WaitingRideOrder")
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
    path: "order/pendingPayment",
    component: PendingPayment
  },
  {
    path: "order/waitingRide",
    component: WaitingRideOrder
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
