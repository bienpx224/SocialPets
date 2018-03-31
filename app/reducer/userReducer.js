var data = {
  isLogin : false,
  user: {},
  showPopupUser: false,
  showPopupChangePicture: false
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
    default: return state;
  }
}

module.exports = userReducer;
