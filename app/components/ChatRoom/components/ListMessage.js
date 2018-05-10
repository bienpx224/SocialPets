import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Message from 'Message';
import {get_list_inbox} from 'chatAction';

class ListMessage extends React.Component{
  constructor(props){
    super(props);
    this.renderListMessage = this.renderListMessage.bind(this);
    this.state = {
      listMsg : [],
      inboxData: {},
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 2500,
    transition: 'scale'
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.listMsg){
      this.state.listMsg = nextProps.listMsg;
    }
    if(nextProps.inboxData){
      this.state.inboxData = nextProps.inboxData;
    }
    this.setState(this.state);
  }
  renderListMessage(){
    if(this.state.listMsg.length > 0){
      this.state.listMsg.map( (value, key)=>{
        return(
          <Message key={key} data={value} />
        )
      })
    }else{
      return(
        <h5><i>nothing to show. let start conversation</i></h5>
      )
    }
  }
  componentDidMount(){
    var objDiv = document.getElementById("style-11-chat");
    if(objDiv) objDiv.scrollTop = objDiv.scrollHeight;
  }
  sendMsg(){
    if(this.props.inboxData && this.props.inboxData.id){
      let content = this.refs.content.value;
      let {dispatch} = this.props;
      let that = this;
      if(content.length === 0) return;
      if(content.length >= 999) return;
      let receive_userId = (this.props.user.id === this.props.inboxData.first_userId.id)?this.props.inboxData.second_userId:this.props.inboxData.first_userId.id;
      let msg = {
        inboxId: this.props.inboxData.id,
        send_userId: this.props.user.id,
        receive_userId : receive_userId,
        content: content,
        isRead: false,
        isActive: true,
      };
      io.socket.post('/message/addMessage',{msg, userSendName:this.props.user.name},function(resData, jwres){
        if(resData.err){
          that.msg.show('ERROR: '+resData.err, {
                            type: 'error',
                            icon: <img src="/images/error.png" />
          })
        }
        if(resData.message && resData.listInbox){
          dispatch(get_list_inbox(resData.listInbox));
          that.state.listMsg.push(resData.message);
          that.setState(that.state);
          that.refs.content.value = "";
        }else{
          alert("not enough data");
        }
      })
    }else{
      this.msg.show('Please choose conversaion to send message', {
                        type: 'error',
                        icon: <img src="/images/error.png" />
      })
    }
  }
  handleType(event){
    var k = event.keyCode;
    if(k === 13){
      if(this.props.inboxData && this.props.inboxData.id){
        let content = this.refs.content.value;
        let {dispatch} = this.props;
        let that = this;
        if(content.length === 0) return;
        if(content.length >= 999) return;
        let receive_userId = (this.props.user.id === this.props.inboxData.first_userId.id)?this.props.inboxData.second_userId:this.props.inboxData.first_userId.id;
        let msg = {
          inboxId: this.props.inboxData.id,
          send_userId: this.props.user.id,
          receive_userId : receive_userId,
          content: content,
          isRead: false,
          isActive: true,
        };
        io.socket.post('/message/addMessage',{msg,userSendName:this.props.user.name},function(resData, jwres){
          if(resData.err){
            that.msg.show('ERROR: '+resData.err, {
                              type: 'error',
                              icon: <img src="/images/error.png" />
            })
          }
          if(resData.message && resData.listInbox){
            dispatch(get_list_inbox(resData.listInbox));
            that.state.listMsg.push(resData.message);
            that.setState(that.state);
            that.refs.content.value = "";
          }else{
            alert("not enough data");
          }
        })
      }else{
        this.msg.show('Please choose conversaion to send message', {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
    }
  }
  render(){
    if(this.state.listMsg.length > 0){
      return(
            <div className="col-md-7">
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                    <div className="tab-content scrollbar-wrapper wrapper scrollbar-outer" id="style-11-chat">
                      <div className="tab-pane active">
                        <div className="chat-body">
                          <ul className="chat-message">
                            {
                                this.state.listMsg.map( (value, key)=>{
                                  return(
                                    <Message key={key} data={value} inbox={this.state.inboxData} />
                                  )
                                })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="send-message">
                      <div className="input-group">
                        <input type="text" className="form-control" placeholder="Type your message" ref="content" onKeyUp={this.handleType.bind(this)} />
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="button" onClick={this.sendMsg.bind(this)}>Send</button>
                        </span>
                      </div>
                    </div>
                  </div>

      )
    }else{
      return(
        <div className="col-md-7">
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <div className="tab-content scrollbar-wrapper wrapper scrollbar-outer" id="style-11-chat">
                  <div className="tab-pane active">
                    <div className="chat-body">
                      <ul className="chat-message">
                          <h5><i>nothing to show. let start conversation</i></h5>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="send-message">
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Type your message" ref="content" onKeyUp={this.handleType.bind(this)} />
                    <span className="input-group-btn">
                      <button className="btn btn-default" type="button" onClick={this.sendMsg.bind(this)}>Send</button>
                    </span>
                  </div>
                </div>
              </div>
      )
    }

  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user, inboxData: state.chatReducer.inboxData, listMsg: state.chatReducer.listMsg};
})(ListMessage);
