import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';

class Follower extends React.Component{
  constructor(props){
    super(props);
  }
  handleFollow(){
    let that = this;
    let userId = this.props.user.id;
    let followed = this.props.userId.id;
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
  render(){
    return(
      <div className="col-md-6 col-sm-6">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <div className="friend-card">
            <img src={this.props.cover} alt="profile-cover" className="img-responsive cover" />
            <div className="card-info">
              <img src={this.props.picture} alt="user" className="profile-photo-lg" />
              <div className="friend-info">
                <a className="pull-right text-green">
                  <button style={{padding:"1px 5px"}} onClick={this.handleFollow.bind(this)} className="btn-primary">
                    <span className="ion-person-add pull-left"></span>Follow
                  </button>
                </a>
                <h5><a className="profile-link">{this.props.name}</a></h5>
                <p>{this.props.email}</p>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Follower);
