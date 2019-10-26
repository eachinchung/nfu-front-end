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

export function update_dormitory(token, room_id) {
  return request({
    method: "post",
    url: "/user/dormitory/update",
    data: {
      room_id: room_id
    },
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });
}
