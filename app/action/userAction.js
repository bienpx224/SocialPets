function login_error(){
  return{ type:"LOGIN_ERROR" };
}
function set_user(user){
  return{ type:"SET_USER", user };
}
function get_person(person){
  return{ type:"GET_PERSON", person };
}
function login_success(user){
  return{ type:"LOGIN_SUCCESS", user };
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
  return{ type:"OPEN_POPUP_USER" }
}
function open_popup_change_picture(){
  return{type:"OPEN_POPUP_CHANGE_PICTURE"}
}
function close_popup_change_picture(){
  return{type:"CLOSE_POPUP_CHANGE_PICTURE"}
}
function open_popup_add_pet(popupPet){
  return{type:"OPEN_POPUP_ADD_PET",popupPet}
}
function close_popup_add_pet(){
  return{type:"CLOSE_POPUP_ADD_PET"}
}
function change_picture(user){
  return{type:"CHANGE_PICTURE", user: user}
}
function change_cover(user){
  return{type:"CHANGE_COVER", user: user}
}
function get_pet(listPet){
  return{type:"GET_PET", listPet: listPet}
}
function add_new_pet(pet){
  return{type:"ADD_NEW_PET", pet: pet}
}
module.exports = {get_person,add_new_pet,close_popup_add_pet,open_popup_add_pet,get_pet,login_error,set_user,login_success,register_error,close_popup_user,open_popup_user,open_popup_change_picture,close_popup_change_picture,change_picture};
