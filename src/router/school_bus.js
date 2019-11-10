const Date = () => import('@/views/SchoolBus/Date')
const Schedule = () => import('@/views/SchoolBus/Schedule')
const BrushTicket = () => import("@/views/SchoolBus/BrushTicket")

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
    component:BrushTicket
  }
]
