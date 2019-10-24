import store from '@/store'
import router from '@/router'
import remember from './get_remember'
import request from "./request"
import {handle_token} from "./token"


function refresh_token(token) {
  return request({
    method: "get",
    url: "oauth/token/refresh",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

function check_token() {
  if (remember() == null) return 0;
  else if (store.state.access_token == null) return 1;
  else if (new Date().getTime() / 1000 > store.state.exp - 120) return 2;
  else return 3

}

export default () => {
  const code = check_token()
  if (code === 1) router.push("/login");
  return 1 < code < 3;
}

// refresh_token(remember()).then(
//   res => handle_token(res),
//   () => router.push("/login")
// )
