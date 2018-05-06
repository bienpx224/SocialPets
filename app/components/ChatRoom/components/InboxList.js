import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Inbox from 'Inbox';

class InboxList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listInbox : [],
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
    let userId = this.props.user.id;
    let that = this
    io.socket.post('/inbox/getListInbox',{userId},function(resData, jwres){
      if(resData.err){
        that.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
      if(resData.listInbox){
        that.state.listInbox = resData.listInbox;
        that.setState(that.state);
      }
    })
  }
  render(){
    if(this.state.listInbox.length >0){
      return(
              <div className="col-md-5">
              <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <ul className="nav nav-tabs contact-list scrollbar-wrapper scrollbar-outer" id="style-11">

                {
                  this.state.listInbox.map( (value, key)=>{
                    if(this.props.user.id === value.first_userId.id){
                      return(
                        <Inbox key={key}  receiveUser={value.second_userId} latestMsg={value.messageIdLatest} data={value} />
                      )
                    }else{
                      return(
                        <Inbox key={key} receiveUser={value.first_userId} latestMsg={value.messageIdLatest}  data={value} />
                      )
                    }
                  })
                }

                </ul>
              </div>
      )
    }else{
      return(
        <div className="col-md-5">
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <ul className="nav nav-tabs contact-list scrollbar-wrapper scrollbar-outer" id="style-11">
            <h2>Không có cái gì hêt</h2>
          </ul>
        </div>
      )
    }
  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user};
})(InboxList);
