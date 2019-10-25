import store from '@/store'
import router from '@/router'

export function handle_token(res) {
  if (res.data.adopt) {
    let exp = new Date();
    exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
    document.cookie =
      "remember=" +
      res.data.message.refresh_token +
      ";expires=" +
      exp.toGMTString();
    store.commit("upToken", res.data.message.access_token);
  } else router.push("/login");
}
