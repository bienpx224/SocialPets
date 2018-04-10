import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';

class Following extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      following: true
    }
  }
  handleFollow(){
    let that = this;
    let userId = this.props.user.id;
    let followed = this.props.followed.id;
    io.socket.post('/follow/follow',{userId, followed}, function(resData, jwres){
        if(resData.err){
          that.msg.show('ERROR: '+resData.err, {
                            type: 'error',
                            icon: <img src="/images/error.png" />
          })
        }else{
          that.msg.show('SUCCESS: You are following that user ', {
                            type: 'success',
                            icon: <img src="/images/success.png" />
          })
          that.setState({following: true});
        }
    })
  }
  handleUnfollow(){
    let that = this;
    let userId = this.props.user.id;
    let followed = this.props.followed.id;
    io.socket.post('/follow/unfollow',{userId, followed}, function(resData, jwres){
        if(resData.err){
          that.msg.show('ERROR: '+resData.err, {
                            type: 'error',
                            icon: <img src="/images/error.png" />
          })
        }else{
          that.msg.show('SUCCESS: You are unfollow that user ', {
                            type: 'success',
                            icon: <img src="/images/success.png" />
          })
          that.setState({following: false});
        }
    })
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 1000,
    transition: 'scale'
  }
  renderBtn(){
    if(this.state.following){
      return (
        <button style={{padding:"1px 5px"}} onClick={this.handleUnfollow.bind(this)} className="btn-primary">
              <span className="ion-eye-disabled pull-left"></span>Unfollow
            </button>
      )
    }else{
      return (
        <button style={{padding:"1px 5px"}} onClick={this.handleFollow.bind(this)} className="btn-primary">
          <span className="ion-person-add pull-left"></span>Follow
        </button>
      )
    }
  }
  render(){
    let followBtn = null;

    return(
      <div className="col-md-6 col-sm-6">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <div className="friend-card">
            <img src={this.props.followed.cover} alt="profile-cover" className="img-responsive cover" />
            <div className="card-info">
              <img src={this.props.followed.picture} alt="user" className="profile-photo-lg" />
              <div className="friend-info">
                <a className="pull-right text-green">
                {this.renderBtn()}
                </a>
                <h5><a className="profile-link">{this.props.followed.name}</a></h5>
                <p>{this.props.followed.email}</p>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Following);
