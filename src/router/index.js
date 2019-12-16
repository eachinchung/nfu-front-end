import Vue from 'vue'
import VueRouter from 'vue-router'
import MainRouter from './main'
import SchoolBusRouter from './schoolBus'

Vue.use(VueRouter)

const Main = () => import('../views/Main')

const Electric = () => import('../views/Electric/index')
const Achievement = () => import('../views/Achievement')
const Credit = () => import('../views/Credit')
const SchoolBus = () => import('../views/SchoolBus')

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
    component: Electric
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
    path: '/school-bus',
    component: SchoolBus,
    redirect: '/main/school-bus',
    children: SchoolBusRouter
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
