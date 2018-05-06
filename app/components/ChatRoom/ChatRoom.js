import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import SearchInbox from 'SearchInbox';
import InboxList from 'InboxList';
import ChatMessage from 'ChatMessage';

class ChatRoom extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
          <div className="col-md-7 static">
            <SearchInbox />
            <div className="chat-room">
              <div className="row">
                <InboxList />
                <ChatMessage />
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
    )
  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user};
})(ChatRoom);
