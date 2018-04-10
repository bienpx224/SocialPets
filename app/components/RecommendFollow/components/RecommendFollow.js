import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';

class RecommendFollow extends React.Component{
  constructor(props){
    super(props);
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
          that.props.getNewList(that.props.user);
        }
    })
  }
  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'light',
    time: 1000,
    transition: 'scale'
  }
  render(){
    return(
      <div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      <div className="follow-user" style={{minWidth:"222px"}}>
        <img src={this.props.followed.picture} alt="" className="profile-photo-sm pull-left" />
        <div>
          <h5><a href="timeline.html">{this.props.followed.name}</a></h5>
          <h6><a href="timeline.html">{this.props.followed.email}</a></h6>
          <h6 className="red-text"><span  className="ion-star pull-left"></span>{this.props.followed.point}</h6>
            <button style={{padding:"1px 5px"}} onClick={this.handleFollow.bind(this)} className="btn-primary">
              <span className="ion-person-add pull-left"></span>Follow
            </button>
        </div>
      </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user : state.userReducer.user};
})(RecommendFollow);
