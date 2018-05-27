import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import NewsfeedContent from 'NewsfeedContent';
import {Link} from 'react-router-dom';
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
  renderRelatePet(h){
    if(h.related_petId){
      return (
        <p className="col-xs-6"><a href="#" className="profile-link">{h.related_petId.name}
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
        <a target="_blank" href={h.image} className="profile-link"><i>{h.image}</i></a>
        <img src={h.image} className="profile-photo-sm pull-left" />
        </p>
      )
    }else{
      return null;
    }
  }
  renderRelateComment(h){
    if(h.related_cmtId){
      return (
        <p className="col-xs-6"><i>{h.related_cmtId.content}</i>
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
          <Link to={"/post/"+h.related_postId.id}>
          <p className="col-xs-6"><i>{h.related_postId.content}</i>
            <img src={h.related_postId.image} className="img-responsive post-image pull-left" />
          </p>
          </Link>
        )
      }else{
        return(
        <Link to={"/post/"+h.related_postId.id}>
          <p className="col-xs-6"><i>{h.related_postId.content}
          </i></p>
        </Link>
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
    let petRelated = this.renderRelatePet(h);
    return(
      <div className="feed-item">
        <div className="live-activity">
          <div className="col-xs-12">
            <p className="col-xs-6"><a href="#" className="profile-link">{h.userId.name}</a> {h.action}</p>
            {petRelated}
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
