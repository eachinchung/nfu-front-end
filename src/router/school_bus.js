const Date = () => import('@/views/SchoolBus/Date')
const Schedule = () => import('@/views/SchoolBus/Schedule')
export default [
  {
    path: 'date',
    component: Date
  },
  {
    path: 'schedule',
    component: Schedule
  }
]
