var data = {
  inboxData: {},
  listMsg: [],
};

var chatReducer = (state = data, action)=>{
  switch(action.type){
    case "GET_INBOX":
      return {...state, inboxData: action.inboxData};
    case "GET_LISTMSG":
      return {...state, listMsg: action.listMsg};
    default: return state;
  }
}

module.exports = chatReducer;
