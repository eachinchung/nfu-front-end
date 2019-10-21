import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('@/views/Home')
const ClassSchedule = () => import('@/views/ClassSchedule')
const SchoolBus = () => import('@/views/SchoolBus')
const Profile = () => import('@/views/Profile')

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/class_schedule',
    component: ClassSchedule
  },
  {
    path: '/school_bus',
    component: SchoolBus
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
