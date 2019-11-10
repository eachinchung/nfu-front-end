const Home = () => import('@/views/Main/Home')
const ClassSchedule = () => import('@/views/Main/ClassSchedule')
const SchoolBus = () => import('@/views/Main/SchoolBus')
const Profile = () => import('@/views/Main/Profile')

export default [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'class-schedule',
    component: ClassSchedule
  },
  {
    path: 'school-bus',
    component: SchoolBus
  },
  {
    path: 'profile',
    component: Profile
  }
]
