import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';

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
        <img src={data.second_userId.picture} alt="" className="profile-photo-sm pull-left"/>
      )
    }else if(data.second_userId && data.second_userId.id === userId){
      return(
        <img src={data.first_userId.picture} alt="" className="profile-photo-sm pull-left"/>
      )
    }else{
      return (<img src="" alt="" className="profile-photo-sm pull-left"/>);
    }
  }
  renderName(data){
    let userId = this.props.user.id;
    if(data.first_userId && data.first_userId.id === userId){
      return(
        <h6>{data.second_userId.name}</h6>
      )
    }else if(data.second_userId && data.second_userId.id === userId){
      return(
        <h6>{data.first_userId.name}</h6>
      )
    }else{
      return <h6>unknown</h6>;
    }
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
                <input type="text" className="form form-control" placeholder="Search friends, photos, videos"/>
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
  return {user: state.userReducer.user, inboxData: state.chatReducer.inboxData};
})(SearchInbox);
