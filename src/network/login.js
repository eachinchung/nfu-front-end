import axios from "axios"
function request(config) {
  const instans = axios.create({
    baseURL: "http://127.0.0.1:5000",
    timeout: 1000
  })

  return instans(config)
}

export function login(config){
  return request(config)
}
