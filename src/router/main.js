const Home = () => import('../views/Main/Home')
const ClassSchedule = () => import('../views/Main/ClassSchedule')
const SchoolBusPlus = () => import('../views/Main/SchoolBusPlus')
const Profile = () => import('../views/Main/Profile')

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
    path: 'school-bus-plus',
    component: SchoolBusPlus
  },
  {
    path: 'profile',
    component: Profile
  }
]
