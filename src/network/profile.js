import request from "./request"
import refresh_token from "./refresh_token"

export function get_user() {
  return request({
    method: "get",
    url: "/user/get",
    headers: {
      'Authorization': 'Bearer ' + refresh_token()
    }
  })
}
