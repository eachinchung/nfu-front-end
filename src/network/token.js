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
function refresh() {
  return request({
    method: "get",
    url: "oauth/token/refresh",
    headers: {
      'Authorization': 'Bearer ' + getRememberToken()
    }
  })
}

// 储存获得的token
function handle_token(res) {
  if (res.data.adopt) {
    let exp = new Date();
    exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie =
      "remember=" +
      res.data.message.refresh_token +
      ";expires=" + exp.toGMTString() + ';path=/';
    store.commit("upToken", res.data.message.access_token);
  }

  return res.data.adopt
}

// 检查是否登录
export function checkLogin(next, to) {
  if (getRememberToken() == null) next({path: "/login", query: {next: to.fullPath}});
  else next();
}

// 尝试发送网络请求
export function tryRequest(theRequest, handle) {
  // 当token不存在时，重新请求token
  if (store.state.access_token == null) {
    refresh().then(res => {
      if (handle_token(res)) theRequest.then(res => handle(res.data))
    })
  } else {
    theRequest.then(res => {
      // 如果服务器返回签名过期
      if (res.data.code === 1001)
      // 则刷新token
        refresh().then(res => {
          if (handle_token(res)) theRequest.then(res => handle(res.data))
        })
      else handle(res.data)
    })
  }

}