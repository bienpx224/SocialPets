var data = {
  isLogin : false,
  user: {},
  listPet: [],
  showPopupUser: false,
  showPopupChangePicture: false,
  showPopupAddPet: false,
  popupPet: "add"
};

var userReducer = (state = data, action)=>{
  switch(action.type){
    case "LOGIN_ERROR":
      return {...state, isLogin: false};
    case "LOGIN_SUCCESS":
      return {...state, isLogin: true, user: action.user};
    case "SET_USER":
      return {...state, user: action.user};
    case "CLOSE_POPUP_USER":
      return {...state, showPopupUser: false};
    case "OPEN_POPUP_USER":
      return {...state, showPopupUser: true};
    case "OPEN_POPUP_CHANGE_PICTURE":
      return {...state, showPopupChangePicture: true};
    case "CLOSE_POPUP_CHANGE_PICTURE":
      return {...state, showPopupChangePicture: false};
    case "CHANGE_PICTURE":
      return {...state, user: action.user};
    case "GET_PET":
      return {...state, listPet: action.listPet};
    case "OPEN_POPUP_ADD_PET":
      return {...state, showPopupAddPet: true, popupPet:action.popupPet};
    case "CLOSE_POPUP_ADD_PET":
      return {...state, showPopupAddPet: false};
    default: return state;
  }
}

module.exports = userReducer;
