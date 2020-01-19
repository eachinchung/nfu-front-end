const Home = () => import('../views/Main/Home')
const ClassSchedule = () => import('../views/Main/ClassSchedule')
const SchoolBusPro = () => import('../views/Main/SchoolBusPro')
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
    path: 'school-bus-pro',
    component: SchoolBusPro
  },
  {
    path: 'profile',
    component: Profile
  }
]
