function login_error(){
  return{
    type:"LOGIN_ERROR"
  };
}
function set_user(user){
  return{
    type:"SET_USER", user
  };
}
function login_success(user){
  return{
    type:"LOGIN_SUCCESS", user
  };
}
function register_error(err){
  return{
    type:"REGISTER_ERROR", err
  };
}
function close_popup_user(){
  return{
    type:"CLOSE_POPUP_USER"
  }
}
function open_popup_user(){
  return{
    type:"OPEN_POPUP_USER"
  }
}
function open_popup_change_picture(){
  return{type:"OPEN_POPUP_CHANGE_PICTURE"}
}
function close_popup_change_picture(){
  return{type:"CLOSE_POPUP_CHANGE_PICTURE"}
}
function change_picture(user){
  return{type:"CHANGE_PICTURE", user: user}
}
function change_cover(user){
  return{type:"CHANGE_COVER", user: user}
}
module.exports = {login_error,set_user,login_success,register_error,close_popup_user,open_popup_user,open_popup_change_picture,close_popup_change_picture,change_picture};
