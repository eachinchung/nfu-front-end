import store from '@/store'
// import router from '@/router'
import remember from './get_remember'
import request from "./request"



function refresh(token) {
  return request({
    method: "get",
    url: "oauth/token/refresh",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

export function check_refresh_token() {
  if (store.state.access_token == null) return true;
  else return new Date().getTime() / 1000 > store.state.exp - 120;
}

export function handle_token(res) {
  if (res.data.adopt) {
    let exp = new Date();
    exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie =
      "remember=" +
      res.data.message.refresh_token +
      ";expires=" + exp + ';path=/';
    store.commit("upToken", res.data.message.access_token);
    return true
  } else return false;
}


export function refresh_token() {
  const token = remember()
  if (token == null) {
    store.commit("rmToken");
    return [false]
  } else return [true, refresh(token)]
}


