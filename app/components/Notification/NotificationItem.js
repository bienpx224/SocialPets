import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import NewsfeedContent from 'NewsfeedContent';
import {Link} from 'react-router-dom';
import time from 'time-ago';
import {set_user, open_popup_user,get_post_err,get_postNewsfeed} from 'userAction';

class NotificationItem extends React.Component{
  constructor(props){
    super(props);
    this.renderRelateUser = this.renderRelateUser.bind(this);
    this.renderRelatePost = this.renderRelatePost.bind(this);
    this.renderRelateImage = this.renderRelateImage.bind(this);
  }
  renderRelateUser(h){
    if(h.related_userId){
      return (
        <p className="col-xs-3"><a href={"/user/"+h.related_userId.email} className="profile-link">{h.related_userId.name}
          <img src={h.related_userId.picture} className="profile-photo-sm pull-left" />
        </a></p>
      )
    }else{
      return null;
    }
  }
  renderRelatePet(h){
    if(h.related_petId){
      return (
        <p className="col-xs-3"><a href="#" className="profile-link">{h.related_petId.name}
          <img src={h.related_petId.image} className="profile-photo-sm pull-left" />
        </a></p>
      )
    }else{
      return null;
    }
  }
  renderRelateImage(h){
    if(h.image){
      return (
        <p className="col-xs-6">
          <a target="_blank" href={h.image} className="profile-link"><i></i>
          <img src={h.image} className="profile-photo-sm pull-left" /></a>
        </p>
      )
    }else{
      return null;
    }
  }
  renderRelateComment(h){
    if(h.related_cmtId){
      return (
        <p className="col-xs-3">
          <i>{h.related_cmtId.content}</i>
        </p>
      )
    }else{
      return null;
    }
  }
  renderRelatePost(h){
    if(h.related_postId){
      if(h.related_postId.image !== null && h.related_postId.content != ""){
        return (
          <Link to={"/post/"+h.related_postId.id}>
          <p className="col-xs-3">
            <i>{h.related_postId.content}</i>
            <img src={h.related_postId.image} className="profile-photo-sm pull-left" />
          </p>
          </Link>
        )
      }else if(h.related_postId.image !== null){
        return(
          <Link to={"/post/"+h.related_postId.id}>
          <img src={h.related_postId.image} className="profile-photo-sm pull-right" />
          </Link>
        )
      }else if(h.related_postId.content != ""){
        return(
          <Link to={"/post/"+h.related_postId.id}>
              <p className="col-xs-3"><i>{h.related_postId.content}</i></p>
          </Link>
        )
      }else{
        return(<Link to={"/post/"+h.related_postId.id}>
                <p className="col-xs-3"><i>{h.related_postId.content}</i></p>
                </Link>
        )
      }

    }else{
      return null;
    }
  }
  renderAction(action){
    if(action === "Yêu thích bài đăng" || action ==="Bình luận trong bài đăng" ){
      return ( action+" của bạn" )
    }else if(action === "Đẵ bắt đầu theo dõi"){
      return ( action+" bạn" )
    }else{
      return ( action )
    }
  }
  render(){
    let h= this.props.data;
    var date = new Date(h.createdAt);
        let timeMsg = date.getTime();
        let renderTime = time.ago(new Date()-(new Date()-timeMsg));
    let renderAction = this.renderAction(h.action);
    let userRelated = this.renderRelateUser(h);
    let postRelated = this.renderRelatePost(h);
    let imageRelated = this.renderRelateImage(h);
    let commentRelated = this.renderRelateComment(h);
    let petRelated = this.renderRelatePet(h);
    return(
      <div className="feed-item">
        <div className="live-activity">
          <div className="col-xs-12">
            {userRelated}
            <p className="col-xs-6">{renderAction}</p>
            {petRelated}
            {postRelated}
          </div>
          <p className="text-muted">{renderTime+"           At: "+h.createdAt}</p>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(NotificationItem);
