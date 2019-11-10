const Date = () => import('@/views/SchoolBus/Date')
const Schedule = () => import('@/views/SchoolBus/Schedule')
const BrushTicket = () => import("@/views/SchoolBus/BrushTicket")
const CreateOrder = () => import("@/views/SchoolBus/CreateOrder")
const NotUsedOrder = () => import("@/views/SchoolBus/NotUsedOrder")

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
    path: 'order/brush-ticket',
    component: BrushTicket
  },
  {
    path: "order/create-order",
    component: CreateOrder
  },
  {
    path: "not-used-order",
    component: NotUsedOrder
  }
]
