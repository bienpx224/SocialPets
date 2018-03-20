import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Post from 'Post';
import MessageList from 'MessageList';
import ChatMessage from 'ChatMessage';

class ChatRoom extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
          <div className="col-md-8 static">
            <Post />
            <div className="chat-room">
              <div className="row">
                <MessageList />
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