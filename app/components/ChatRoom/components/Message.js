import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import time from 'time-ago';

class Message extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isDelete: false
    }

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
  deleteMsg(){
    if(this.props.user.id === this.props.data.send_userId){
      let id = this.props.data.id;
      io.socket.post('/message/deleteMsg',{id},(resData, jwres)=>{
        if(resData.ok){
          this.setState({isDelete:true})
        }else console.log(" co loi xoa tin nahn");
      })
    }else{
      console.log("khong phai chu nhan tin nhan nay");
    }
  }
  render(){
    let userId = this.props.user.id;
    let renderPos = (userId===this.props.data.send_userId)?"right":"left";
    let hidden = this.state.isDelete ===true?"hidden":"";
    let renderDelete = (userId===this.props.data.send_userId)?"Delete":null;
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
      return(
        <div className={""+hidden}>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <li className={""+renderPos}>
          {renderImage}
          <div className="chat-item">
            <div className="chat-item-header">
              <h5>{this.props.data.content}</h5>
              <small className="text-muted">{renderCreateTime}</small>
              <small title="Double click" onDoubleClick={this.deleteMsg.bind(this)} style={{cursor:"pointer"}} className="text-muted pull-right">{renderDelete}</small>
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
