const Electric = () => import('../views/Electric/main')
const ElectricPay = () => import('../views/Electric/Pay')

export default [
  {
    path: 'main',
    component: Electric
  },
  {
    path: 'pay',
    component: ElectricPay
  },
]