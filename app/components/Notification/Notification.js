import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import SearchInbox from 'SearchInbox';
import NotificationItem from 'NotificationItem';
import ReactPlaceholder from 'react-placeholder';
import {get_notify} from 'userAction';

class Notification extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      listNotify: [],
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.listNotify){
      this.setState({listNotify: nextProps.listNotify, loading: false});
    }
  }
  componentDidMount(){
    let userId = this.props.user.id;
    let {dispatch} = this.props;
    io.socket.post('/notification/getListNotify',{userId},(resData, jwres)=>{
      if(resData.listNotify){
        dispatch(get_notify(resData.listNotify));
      }else{
        this.state.listNotify = [];
        this.setState(this.state);
      }
    })

    io.socket.post('/notification/setIsRead',{userId},(resData, jwres)=>{
      if(resData.listNotify){
        dispatch(get_notify(resData.listNotify));
      }else{
      }
    })

  }
  render(){
    var count = this.state.listNotify.length;
    if(this.state.loading) return(
      <div className="col-md-7 static fixed-content">

          <div className="row">
            <div className="border-chat">
              <h2 style={{textAlign:"center"}}>NOTIFICATION </h2>
            </div>
          </div>

        <div className="chat-room">
          <div className="row">
          <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
            <h3></h3>
          </ReactPlaceholder>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    )
    else if(count === 0)
      return(
        <div className="col-md-7 static fixed-content">
            <div className="row">
              <div className="border-chat">
                <h2 style={{textAlign:"center"}}>NOTIFICATION </h2>
              </div>
            </div>

          <div className="chat-room">
            <div className="row">
              <h4 style={{textAlign:"center"}}><i>Nothing to show  </i></h4>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
    )
    else
    return(
            <div className="col-md-7 static fixed-content">
                <div className="row">
                  <div className="border-chat">
                    <h2 style={{textAlign:"center"}}>NOTIFICATION </h2>
                  </div>
                </div>
              <div className="chat-room">
                <div className="row">
                {this.state.listNotify.map( (value, key)=>{
                  return( <NotificationItem key={key} data={value} /> )
                })
                }
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
    )

  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user, listNotify: state.userReducer.listNotify};
})(Notification);
