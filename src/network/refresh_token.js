import store from '@/store'
import router from '@/router'
import remember from './get_remember'
import request from "./request"
import { handle_token } from "./token"


function refresh_token(token) {
  return request({
    method: "get",
    url: "oauth/token/refresh",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

function check_refresh_token() {
  if (store.state.access_token == null) return true;
  else return new Date().getTime() / 1000 > store.state.exp - 120;
}

export default () => {
  if (check_refresh_token()) {
    const token = remember()

    if (token == null) {
      router.push("/login");
      store.commit("rmToken");
      return store.state.access_token
    }

    refresh_token(token).then(
      res => {
        handle_token(res)
        return store.state.access_token
      },
      () => {
        router.push("/login")
        return store.state.access_token
      }
    );

  } else return store.state.access_token
}


