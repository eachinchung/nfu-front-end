import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Main = () => import('@/views/Main')
const Home = () => import('@/views/Main/Home')
const ClassSchedule = () => import('@/views/Main/ClassSchedule')
const SchoolBus = () => import('@/views/Main/SchoolBus')
const Profile = () => import('@/views/Main/Profile')

const main = [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'class_schedule',
    component: ClassSchedule
  },
  {
    path: 'school_bus',
    component: SchoolBus
  },
  {
    path: 'profile',
    component: Profile
  }
]

const routes = [
  {
    path: '/',
    redirect: '/main/home'
  },
  {
    path: '/main',
    component: Main,
    redirect: '/main/home',
    children: main
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
