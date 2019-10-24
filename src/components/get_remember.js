export default () => {
  const name = 'remember'
  const cookies = document.cookie;
  const list = cookies.split("; ")

  for (let i = 0; i < list.length; i++) {
    let arr = list[i].split("=")
    if (arr[0] == name)
      return arr[1]
  }
  
  return null;
}
