var data = {
  listHistory: [],
};

var historyReducer = (state = data, action)=>{
  switch(action.type){
    case "LIST_HISTORY":
      return {...state, listHistory: action.listHistory}
    case "ADD_NEW_HISTORY":
      return {...state, listHistory: [...state.listHistory,action.history]}
    default: return state;
  }
}

module.exports = historyReducer;
