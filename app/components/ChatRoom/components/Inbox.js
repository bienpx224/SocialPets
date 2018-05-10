import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {get_inbox, get_list_msg,get_list_inbox} from 'chatAction';

class Inbox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      count : 0,
      listMsg : props.data.listMsg,
      inboxData : {},
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 2000,
    transition: 'scale'
  }
  componentDidMount(){
  }
  checkLatestMsg(){
    if(this.props.latestMsg && this.props.latestMsg.content){
      return( this.props.latestMsg.content );
    }else{
      return (<i>chưa có tin nhắn nào</i>);
    }
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.listInbox && nextProps.listInbox.length>0){
        nextProps.listInbox.map( (value, key)=>{
          if(value.id === this.props.data.id){
            this.state.listMsg = value.listMsg;
            this.setState(this.state);
          }
        })
      }
  }
  getInbox(){
    let userId = this.props.user.id;
    let {dispatch} = this.props;
    let inboxId = this.props.data.id;

    io.socket.post('/message/setIsRead',{id: this.props.data.id, userId},(resData2, jwres)=>{

      if(resData2.err){
        this.msg.show('ERROR: '+resData2.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
      if(resData2.listInbox){
          dispatch(get_list_inbox(resData2.listInbox));

          io.socket.post('/inbox/getInboxById',{inboxId},(resData, jwres)=>{
            if(resData.err){
              this.msg.show('ERROR: '+resData.err, {
                                type: 'error',
                                icon: <img src="/images/error.png" />
              })
            }
            if(resData.inboxData){
                dispatch(get_inbox(resData.inboxData));
                document.title = "Social Pets";
            }
          })
      }
    })

  }
  render(){
    let renderLatestMsg = this.checkLatestMsg();
    let listMsg = this.state.listMsg;
    let renderMsgUnreadF = ()=>{
      let count = 0;
      if(listMsg.length>0){
        listMsg.map( (value, key)=>{
          if(this.props.user.id===value.receive_userId && value.isRead === false){
            count ++;
          }
        })
      }
      if(count >0){
        return (<div className="chat-alert">{count}</div>)
      }else{
        return (<div className="seen"><i className="icon ion-checkmark-round"></i></div>)
      }
    }
    let renderMsgUnread = renderMsgUnreadF();
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
              {renderMsgUnread}
            </div>
          </div>
        </a>
      </li>
    )
  }
}


module.exports = connect(function(state){
return {user: state.userReducer.user, inboxData: state.chatReducer.inboxData, listMsg: state.chatReducer.listMsg, listInbox: state.chatReducer.listInbox};
})(Inbox);
