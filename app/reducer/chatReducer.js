var data = {
  inboxData: {},
  listInbox: [],
  listInboxS: [],
  listMsg : [],
  countMsgUnread : 0,
};

var chatReducer = (state = data, action)=>{
  switch(action.type){
    case "GET_INBOX":
      return {...state, inboxData: action.inboxData, listMsg: action.inboxData.listMsg};
    case "GET_LIST_INBOX":
      return {...state, listInbox: action.listInbox};
    case "GET_LIST_INBOXS":
      return {...state, listInboxS: action.listInboxS};
    case "GET_LIST_MSG":
      return {...state, listMsg: action.listMsg};
    default: return state;
  }
}

module.exports = chatReducer;
