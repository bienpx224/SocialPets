import React from 'react';
import {connect} from 'react-redux';
import {set_user} from 'userAction';
import {Link} from 'react-router-dom';

class Notify extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.type === "message"){
      return(
        <Link to='/newsfeed/chatroom'>
          <div className="post-comment">
            <p><b>{this.props.userSendName}</b> đã gửi tin nhắn cho bạn.</p>
          </div>
        </Link>
      )
    }else{
      return(
        <div className="post-comment">
          <img src={this.props.data.userId.picture} alt="" className="profile-photo-sm" />
          <p><a className="profile-link">{this.props.data.userId.name} </a><i className="em em-laughing"></i> {"đã "+this.props.data.action + " của bạn"} </p>
        </div>
      )
    }
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Notify);
