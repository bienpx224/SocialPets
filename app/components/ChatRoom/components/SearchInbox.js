import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {get_list_inbox} from 'chatAction';
import {Link} from 'react-router-dom';

class SearchInbox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inboxData : {},
    }
    this.renderPicture = this.renderPicture.bind(this);
    this.renderName = this.renderName.bind(this);
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 1000,
    transition: 'scale'
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.inboxData){
      this.state.inboxData = nextProps.inboxData;
      this.setState(this.state);
    }
  }
  renderPicture(data){
    let userId = this.props.user.id;
    if(data.first_userId && data.first_userId.id === userId){
      return(
        <Link to={"/user/"+data.second_userId.email} ><img src={data.second_userId.picture} alt="" className="profile-photo-sm pull-left"/></Link>
      )
    }else if(data.second_userId && data.second_userId.id === userId){
      return(
        <Link to={"/user/"+data.first_userId.email} ><img src={data.first_userId.picture} alt="" className="profile-photo-sm pull-left"/></Link>
      )
    }else{
      return (<img src="" alt="" className="profile-photo-sm pull-left"/>);
    }
  }
  renderName(data){
    let userId = this.props.user.id;
    if(data.first_userId && data.first_userId.id === userId){
      return(
        <Link to={"/user/"+data.second_userId.email} ><h6>{data.second_userId.name}</h6></Link>
      )
    }else if(data.second_userId && data.second_userId.id === userId){
      return(
        <Link to={"/user/"+data.first_userId.email} ><h6>{data.first_userId.name}</h6></Link>
      )
    }else{
      return <h6>unknown</h6>;
    }
  }
  handleSearch(){
    let userId = this.props.user.id;
    let name = this.refs.name.value;
    let {dispatch} = this.props;
    io.socket.post('/inbox/getListInbox',{userId,name:name},(resData, jwres)=>{
      if(resData.err){
        this.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
      if(resData.listInbox){
        dispatch(get_list_inbox(resData.listInbox));
      }
    })
  }
  render(){
    let data = this.state.inboxData;
    let renderPicture = this.renderPicture(data);
    let renderName = this.renderName(data);
    let renderUpdatedAt = data.updatedAt?data.updatedAt:"unknown";
    return(
      <div className="create-post">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <div className="row">
            <div className="border-chat">
              <h2 style={{textAlign:"center"}}>CHAT ROOM </h2>
            </div>
          </div>
          <div className="row">

            <div className="col-md-5 col-sm-5">
                <input type="text" ref="name" className="form form-control" onChange={this.handleSearch.bind(this)} placeholder="Search friends, photos, videos"/>
            </div>

            <div className="col-md-7 col-sm-7">
              <div className="contact">
                {renderPicture}
                <div className="msg-preview">
                  {renderName}
                  <small className="text-muted">{renderUpdatedAt}</small>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user, inboxData: state.chatReducer.inboxData, listInbox: state.chatReducer.listInbox};
})(SearchInbox);
