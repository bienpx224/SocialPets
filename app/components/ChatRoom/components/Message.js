import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import time from 'time-ago';

class Message extends React.Component{
  constructor(props){
    super(props);

  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 2500,
    transition: 'scale'
  }
  componentDidMount(){
    var objDiv = document.getElementById("style-11-chat");
    if(objDiv) objDiv.scrollTop = objDiv.scrollHeight;
  }
  render(){
    let userId = this.props.user.id;
    let renderPos = (userId===this.props.data.send_userId)?"right":"left";
    var date = new Date(this.props.data.createdAt);
    let timeMsg = date.getTime();
    let renderCreateTime = time.ago(new Date()-(new Date()-timeMsg));
    let renderImageF = ()=>{
      if(userId === this.props.data.send_userId){
        if(userId === this.props.inbox.first_userId.id){
          return( <img src={""+this.props.inbox.first_userId.picture} alt="" className={"profile-photo-sm pull-"+renderPos}/> )
        }else{
          return( <img src={""+this.props.inbox.second_userId.picture} alt="" className={"profile-photo-sm pull-"+renderPos}/> )
        }
      }else{
        if(userId === this.props.inbox.first_userId.id){
          return( <img src={""+this.props.inbox.second_userId.picture} alt="" className={"profile-photo-sm pull-"+renderPos}/> )
        }else{
          return( <img src={""+this.props.inbox.first_userId.picture} alt="" className={"profile-photo-sm pull-"+renderPos}/> )
        }
      }
    };

    let renderImage = renderImageF();
    //
    // (userId===this.props.data.send_userId.id)?
    //   <img src={""+this.props.inbox.first_userId.picture} alt="" className="profile-photo-sm pull-right"/>:
    //   <img src={""+this.props.inbox.second_userId.picture} alt="" className="profile-photo-sm pull-left" />;
      return(
        <div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <li className={""+renderPos}>
          {renderImage}
          <div className="chat-item">
            <div className="chat-item-header">
              <h5>{this.props.data.content}</h5>
              <small className="text-muted">{renderCreateTime}</small>
            </div>
          </div>
        </li>
        </div>
      )


  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user};
})(Message);
