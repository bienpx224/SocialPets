
function add_more_history(history){
  return{
    type:"ADD_NEW_HISTORY", history
  }
}
function list_history(listHistory){
  return {
    type: "LIST_HISTORY", listHistory
  }
}
module.exports = {add_more_history,list_history};
