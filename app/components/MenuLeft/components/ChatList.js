import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';

class Chatlist extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
        <div id="chat-block">
          <div className="title">Chat Online</div>
          <ul className="online-users list-inline">
            <li>
              <a href="#" title={this.props.user.name}>
                <img src="/images/data/defaultAvatar.jpg" className="img-responsive profile-photo" />
                <span className="online-dot"></span>
              </a>
            </li>
          </ul>
        </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Chatlist);