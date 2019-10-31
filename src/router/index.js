import Vue from 'vue'
import VueRouter from 'vue-router'
import MainRouter from './main'
import SchoolBusRouter from './school_bus'

Vue.use(VueRouter)

const Main = () => import('@/views/Main')

const SchoolBus = () => import('@/views/SchoolBus')

const Login = () => import('@/views/Login')
const SignUp = () => import('@/views/SignUp')


const routes = [
  {
    path: '/',
    redirect: '/main/home'
  },
  {
    path: '/main',
    component: Main,
    redirect: '/main/home',
    children: MainRouter
  },
  {
    path: '/school_bus',
    component: SchoolBus,
    children: SchoolBusRouter
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/sign_up',
    component: SignUp
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
