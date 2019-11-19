import store from '@/store'
import request from "./request";

// 获取储存在cookies的RememberToken
function getRememberToken() {
  const name = 'remember'
  const cookies = document.cookie;
  const list = cookies.split("; ")
  for (let i = 0; i < list.length; i++) {
    let arr = list[i].split("=")
    if (arr[0] === name)
      if (arr[1] === "") return null;
      else return arr[1]
  }
  return null;
}

// 发送刷新cookies的请求
export function refresh() {
  return request({
    method: "get",
    url: "oauth/token/refresh",
    headers: {
      'Authorization': `Bearer ${getRememberToken()}`
    }
  })
}

// 储存获得的token
export function handleToken(res) {
  localStorage.setItem("remember", res.data.message.refreshToken)
  store.commit("upAccessToken", res.data.message.accessToken);
}

// 检查是否登录
export function checkLogin(to, next) {
  if (localStorage.getItem("remember") == null) next({path: "/login", query: {next: to.fullPath}});
  else next();
}