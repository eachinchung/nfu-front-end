import axios from "axios"
export function request(config) {
  const instans = axios.create({
    baseURL: "http://127.0.0.1:5000",
    timeout: 1000
  })

  instans.interceptors.request.use(config => {
    return config
  })

  return instans(config)
}
