import Vue from 'vue'
import VueRouter from 'vue-router'
import MainRouter from './main'
import SchoolBusProRouter from './schoolBusPro'
import ElectricRouter from './electric'

Vue.use(VueRouter)

const Main = () => import('../views/Main')

const Electric = () => import('../views/Electric')

const Achievement = () => import('../views/Achievement')
const Credit = () => import('../views/Credit')
const CreditPro = () => import('../views/CreditPro/index')
const creditList = () => import('../views/CreditPro/creditList')
const SchoolBusPro = () => import('../views/SchoolBusPro')

const Feedback = () => import('../views/feedback')
const Login = () => import('../views/Login')
const SignUp = () => import('../views/SignUp')
const Activation = () => import('../views/Activation')


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
    path: '/electric',
    component: Electric,
    redirect: '/electric/main',
    children: ElectricRouter
  },
  {
    path: '/achievement',
    component: Achievement
  },
  {
    path: '/credit',
    component: Credit
  },
  {
    path: '/credit-pro',
    component: CreditPro
  },
  {
    name: 'creditList',
    path: '/credit-pro/:courseType',
    component: creditList
  },
  {
    path: '/school-bus-pro',
    component: SchoolBusPro,
    redirect: '/main/school-bus-pro',
    children: SchoolBusProRouter
  },
  {
    path: '/feedback',
    component: Feedback
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/sign-up',
    component: SignUp
  },
  {
    path: '/activation',
    component: Activation
  },
  {
    path: '*',
    component: () => import('../views/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
