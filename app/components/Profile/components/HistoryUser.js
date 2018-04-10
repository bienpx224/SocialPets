import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import NewsfeedContent from 'NewsfeedContent';
import {set_user, open_popup_user,get_post_err,get_postNewsfeed} from 'userAction';

class HistoryUser extends React.Component{
  constructor(props){
    super(props);
    this.renderRelateUser = this.renderRelateUser.bind(this);
    this.renderRelatePost = this.renderRelatePost.bind(this);
    this.renderRelateImage = this.renderRelateImage.bind(this);
  }
  renderRelateUser(h){
    if(h.related_userId){
      return (
        <p className="col-xs-6"><a href="#" className="profile-link">{h.related_userId.name}
          <img src={h.related_userId.picture} className="profile-photo-sm pull-left" />
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
          <img src={h.related_userId.picture} className="profile-photo-sm pull-left" />
        </p>
      )
    }else{
      return null;
    }
  }
  renderRelateComment(h){
    if(h.related_cmtId){
      return (
        <p className="col-xs-6">"{h.related_cmtId.content}"
        </p>
      )
    }else{
      return null;
    }
  }
  renderRelatePost(h){
    if(h.related_postId){
      if(h.related_postId.image !== null){
        return (
          <p className="col-xs-6"><a href="#" className="profile-link"><i>"{h.related_postId.content}"</i>
            <img src={h.related_postId.image} className="profile-photo-sm pull-left" />
          </a></p>
        )
      }else{
        return(
        <p className="col-xs-6"><a href="#" className="profile-link">"{h.related_postId.content}"
        </a></p>
        )
      }

    }else{
      return null;
    }
  }
  render(){
    let h= this.props.data;
    let userRelated = this.renderRelateUser(h);
    let postRelated = this.renderRelatePost(h);
    let imageRelated = this.renderRelateImage(h);
    let commentRelated = this.renderRelateComment(h);
    return(
      <div className="feed-item">
        <div className="live-activity">
          <div className="col-xs-12">
            <p className="col-xs-6"><a href="#" className="profile-link">{h.userId.name}</a> {h.action}</p>
            {userRelated}
            {imageRelated}
            {postRelated}
            {commentRelated}
          </div>
          <p className="text-muted">{h.createdAt}</p>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(HistoryUser);
