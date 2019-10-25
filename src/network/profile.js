import request from "./request"


export function get_user(token) {
  return request({
    method: "get",
    url: "/user/get",
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}
