import store from '@/store'

// 储存获得的token
export function handleToken(res) {
  localStorage.clear()
  localStorage.setItem("remember", res.data.message.refreshToken)
  store.commit("upAccessToken", res.data.message.accessToken)
}

// 检查是否登录
export function checkLogin(to, next) {
  if (localStorage.getItem("remember") == null) next({path: "/login", query: {next: to.fullPath}})
  else next()
}