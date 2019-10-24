import { refresh_token } from "../network/token"

function refreshToken() {
  const r_token = document.cookie.split("=")[1]
  refresh_token(r_token).then(
    res => {
      if (res.data.adopt) {
        let exp = new Date();
        exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
        document.cookie =
          "remember=" +
          res.data.message.refresh_token +
          ";expires=" +
          exp.toGMTString();

        return res.data.message.access_token
      } else return false
    },
    () => {
      return false
    }
  )
}


export default {
  upToken(context) {
    const token = refreshToken()
    if(token) context.commit("upToken", token)
  }
}
