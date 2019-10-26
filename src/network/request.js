import axios from "axios"

export default config => {
  const instants = axios.create({
    baseURL: process.env.VUE_APP_POST_URL,
    timeout: 1000
  })

  return instants(config)
}
