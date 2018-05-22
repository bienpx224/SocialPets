import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';

class Pet extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isActive: true,
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 2000,
    transition: 'scale'
  }
  deletePet(){
    let that = this;
    let petId = this.props.data.id;
    io.socket.post('/pet/deletePet',{petId}, function(resData, jwres){
      if(resData.pet){
        that.msg.show('Success: You left that pet', {
                          type: 'success',
                          icon: <img src="/images/success.png" />
        })
        that.state.isActive = false;
        that.setState(that.state);
      }else if(resData.err){
        that.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }else{ alert('Có lỗi bất thường');}
    })
  }
  unDeletePet(){
    let that = this;
    let petId = this.props.data.id;
    io.socket.post('/pet/unDeletePet',{petId}, function(resData, jwres){
      if(resData.pet){
        that.msg.show('Success: You came back to that pet ', {
                          type: 'success',
                          icon: <img src="/images/success.png" />
        })
        that.state.isActive = true;
        that.setState(that.state);
      }else if(resData.err){
        that.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }else{ alert('Có lỗi bất thường');}
    })
  }
  renderBtn(){
    if(this.props.type==="person"){
      return null;
    }else{
      if(this.state.isActive === true){
        return (
          <button title="give up pet" onClick={this.deletePet.bind(this)} className="btn btn-danger cssDelete" >
            <span style={{fontSize:"20px"}} className="ion-close-circled pull-left"></span>
          </button>
        )
      }else{
        return (
          <button title="Got it's back" onClick={this.unDeletePet.bind(this)} className="btn btn-primary cssDelete" >
            <span style={{fontSize:"20px"}} className="ion-ios-heart pull-left"></span>
          </button>
        )
      }
    }
  }
  render(){

    return(
      <div className="feed-item">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="live-activity">
          <div className="col-xs-12">
            <div className="col-xs-3 profile-info">
              <img src={this.props.data.image} className="profile-photo-lg pull-left" />
            </div>
            <div className="col-xs-7 profile-info" >
              <h3>Name : {this.props.data.name}</h3>
              <p>Type : {this.props.data.type}</p>
              <p>Description: {this.props.data.description}</p>
            </div>
            <div className="col-xs-2">
              {this.renderBtn()}
            </div>
          </div>
          <p className="text-muted">{this.props.data.createdAt}</p>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Pet);
