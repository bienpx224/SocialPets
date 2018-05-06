import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {get_inbox} from 'chatAction';

class Inbox extends React.Component{
  constructor(props){
    super(props);
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 2000,
    transition: 'scale'
  }
  componentDidMount(){
    let userId = this.props.user.id;
    let that = this;
    // io.socket.post('/inbox/getListInbox',{userId},function(resData, jwres){
    //   if(resData.err){
    //     that.msg.show('ERROR: '+resData.err, {
    //                       type: 'error',
    //                       icon: <img src="/images/error.png" />
    //     })
    //   }
    //   if(resData.listInbox){
    //     that.state.listInbox = resData.listInbox;
    //     that.setState(that.state);
    //   }
    // })
  }
  checkLatestMsg(){
    if(this.props.latestMsg && this.props.latestMsg.content){
      return( this.props.latestMsg.content );
    }else{
      return (<i>chưa có tin nhắn nào</i>);
    }
  }
  getInbox(){
    let {dispatch} = this.props;
    let inboxId = this.props.data.id;
    io.socket.post('/inbox/getInboxById',{inboxId},(resData, jwres)=>{
      if(resData.err){console.log(resData);
        this.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
      if(resData.inboxData){
        dispatch(get_inbox(resData.inboxData));
      }
    })
  }
  render(){
    let renderLatestMsg = this.checkLatestMsg();
    return(
          <li className="active" onClick={this.getInbox.bind(this)}>
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <a href="#contact-1" data-toggle="tab">
              <div className="contact">
                <img src={this.props.receiveUser.picture} alt="" className="profile-photo-sm pull-left"/>
                <div className="msg-preview">
                  <h6>{this.props.receiveUser.name}</h6>
                  <p className="text-muted">{renderLatestMsg}</p>
                  <small className="text-muted">{this.props.data.updatedAt}</small>
                  <div className="chat-alert">1</div>
                </div>
              </div>
            </a>
          </li>
    )
  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user};
})(Inbox);
