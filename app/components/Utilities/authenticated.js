function checkLoginLocalStorage(){
  if(localStorage.user.isOnline) return true;
  return false;
}
function setUserLocalStorage(user){
  localStorage.user = user;
}
module.exports = {checkLoginLocalStorage, setUserLocalStorage};