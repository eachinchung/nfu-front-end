import axios from "axios"

export default config => {
  const instants = axios.create({
    baseURL: "http://127.0.0.1:5000",
    timeout: 1000
  })

  return instants(config)
}
