import md5 from "./md5"
import store from "../store";

export default uri => {
  const timestamp = ((new Date().getTime() / 1000) + 30).toFixed()
  const hashValue = md5(`${uri}-${timestamp}-${store.state.userId}-0-${process.env.VUE_APP_CDN_PRIVATE_KEY}`)
  return `${timestamp}-${store.state.userId}-0-${hashValue}`
}