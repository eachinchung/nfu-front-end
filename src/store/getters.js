// function check_token(token) {
//   if(token==null){

//   }

// }




function check_token(token, exp) {
  if (token == null) return false;
  else if (parseInt(new Date().getTime() / 1000) > exp - 120) return false;
  else return token

}

export default {
  token(state) {
    const token = state.access_token
    const exp = state.exp
    console.log(parseInt(new Date().getTime() / 1000));
    return check_token(token, exp)
  }
}
