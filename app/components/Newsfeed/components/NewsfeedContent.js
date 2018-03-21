import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';

class NewsfeedContent extends React.Component{
  constructor(props){
    super(props);
  }
  handleType(event){
    var k = event.keyCode;
    if(k == 13){
      alert('enter enter');
    }
  }
  render(){
    return(
      <div className="post-content">

        <div className="post-container">
          <img src={"/images/data/"+this.props.owner.picture} className="profile-photo-md pull-left" alt="" />
          <div className="post-detail">

                  <div className="user-info">
                    <h5><a href="#" className="profile-link">{this.props.owner.name}</a> <span className="following">following</span></h5>
                    <p className="text-muted">Published a photo time: {this.props.createdAt}</p>
                  </div>

                  <div className="line-divider"></div>
                  <img src={"/images/data/"+this.props.image} alt="" className="img-responsive post-image"/>
                  <div className="post-text">
                    <p>{this.props.content}<i className="em em-anguished"></i> <i className="em em-anguished"></i> <i className="em em-anguished"></i></p>
                  </div>
                  <div className="">
                    <a className="btn text-green"><i className="ion-ios-heart"></i> 13</a>
                    <a className="btn text-red"><i className="icon ion-thumbsdown"></i> 0</a>
                  </div>
                  <div className="line-divider"></div>
                  <div className="post-comment">
                    <img src="/images/data/defaultAvatar.jpg" alt="" className="profile-photo-sm" />
                    <p><a href="#" className="profile-link">Diana </a><i className="em em-laughing"></i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                  </div>
                  <div className="post-comment">
                    <img src="/images/data/defaultAvatar.jpg" alt="" className="profile-photo-sm" />
                    <p><a href="#" className="profile-link">John</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
                  </div>
                  <div className="post-comment">
                    <img src={"/images/data/"+this.props.owner.picture} alt="" className="profile-photo-sm" />
                    <input type="text" className="form-control" onKeyUp={this.handleType.bind(this)} placeholder="Post a comment"/>
                  </div>


          </div>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(NewsfeedContent);