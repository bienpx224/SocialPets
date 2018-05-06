function get_inbox(inboxData) {
  return {type:"GET_INBOX", inboxData: inboxData}
}
module.exports = {get_inbox};
