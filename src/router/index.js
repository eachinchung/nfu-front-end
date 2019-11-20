import Vue from 'vue'
import VueRouter from 'vue-router'
import MainRouter from './main'
import SchoolBusRouter from './schoolBus'

Vue.use(VueRouter)

const Main = () => import('../views/Main')

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
    path: '/schoolBus',
    component: SchoolBus,
    redirect: '/main/schoolBus',
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
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
