import axios from "axios"

export default config => {
  const instants = axios.create({
    baseURL: "http://192.168.1.3:5000",
    timeout: 1000
  })

  return instants(config)
}
