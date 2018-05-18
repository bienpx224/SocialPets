var data = {
  loading: false,
  person: {},
  isLogin : false,
  user: {},
  listPet: [],
  showPopupUser: false,
  showPopupChangePicture: false,
  showPopupAddPet: false,
  showPopupFeedback : false,
  popupPet: "add",
  listNotify: [],
  listAllUser: [],
};

var userReducer = (state = data, action)=>{
  switch(action.type){
    case "CHANGE_LOADING":
      return {...state, loading: action.loading};
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
    case "CLOSE_POPUP_FEEDBACK":
      return {...state, showPopupFeedback: false};
    case "OPEN_POPUP_FEEDBACK":
      return {...state, showPopupFeedback: true};
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
    case "ADD_NEW_PET":
      return {...state, listPet: [action.pet,...state.listPet]};
    case "GET_PERSON":
      return {...state, person : action.person};
    case "GET_NOTIFY":
      return {...state, listNotify: action.listNotify};
    case "ADD_NOTIFY":
      return {...state, listNotify: [...state.listNotify, action.notify]};
    case "GET_LISTALLUSER":
      return {...state, listAllUser: action.listAllUser};
    default: return state;
  }
}

module.exports = userReducer;
