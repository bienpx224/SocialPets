function get_inbox(inboxData) {
  return {type:"GET_INBOX", inboxData: inboxData}
}
function get_list_inbox(listInbox) {
  return {type:"GET_LIST_INBOX", listInbox: listInbox}
}
function get_list_msg(listMsg) {
  return {type:"GET_LIST_MSG", listMsg: listMsg}
}
module.exports = {get_inbox, get_list_inbox,get_list_msg};
