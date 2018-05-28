import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import Comment from 'Comment';
import {Link} from 'react-router-dom';
import time from 'time-ago';

class NewsfeedContent2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      react : this.props.data.count||this.props.data.react.length,
      isReact : false,
      listComment : [],

    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 2000,
    transition: 'scale'
  }
  componentWillReceiveProps(nextProps){

  }
  componentDidMount(){
  }

  componentWillMount(){
      let userId = this.props.user.id;
      let arrUser = this.props.data.react;
      arrUser.map( (value, key)=>{
        if(userId === value.userId){
          this.state.isReact = true; this.setState(this.state);
        }
      })
  }

  renderBtnReact(){
    if(this.state.isReact === true){
      return (<a onClick={this.react.bind(this)} className="btn text-green pull-left"><i className="ion-ios-heart"></i>{this.state.react}</a>)
    }else{
      return (<a onClick={this.react.bind(this)} className="btn text-red pull-left"><i className="ion-ios-heart"></i>{this.state.react}</a>)
    }
  }
  react(){
    let userId = this.props.user.id;
    let postId = this.props.data.id;
    let related_userId = this.props.owner.id;
    io.socket.post('/react/addReact',{userId, postId, related_userId},(resData, jwres)=>{
      if(resData.err){
        alert(resData.err);
      }
      if(resData.react){
        this.state.react ++; this.state.isReact = true;
        this.setState(this.state);
      }
      if(resData.ok){
        this.state.react --; this.state.isReact = false;
        this.setState(this.state);
      }
    })
  }
  render(){
    var date = new Date(this.props.data.createdAt);
    let timeMsg = date.getTime();
    let renderTime = time.ago(new Date()-(new Date()-timeMsg));
    let renderBtnReact = this.renderBtnReact();
    return(
      <div className="grid-item col-md-12 col-sm-12" >
          <div className="media-grid">
            <div className="img-wrapper" data-toggle="modal" data-target=".modal-1">
              <img src={this.props.data.image} alt="" className="img-responsive post-image" />
            </div>
            <div className="media-info">
              <div className="reaction">
                {renderBtnReact}
                <a className="btn text-red"><i className="fa fa-thumbs-down"></i>{this.props.data.comments.length}</a>
              </div>
              <div className="user-info">
                <img src={this.props.data.userId.picture} alt="" className="profile-photo-sm pull-left" />
                <div className="user">
                  <h6><a href="#" className="profile-link">{this.props.data.userId.name}</a></h6>
                  <a className="text-green" href="#">{"Point: "+this.props.data.userId.point}</a>
                </div>
              </div>
            </div>

                {/*  Popup
                    <div className="modal fade modal-1" tabIndex="-1" role="dialog" aria-hidden="true">
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="post-content">
                            <img src={this.props.data.image} alt="post-image" className="img-responsive post-image" />
                            <div className="post-container">
                              <img src={this.props.data.userId.picture} alt="user" className="profile-photo-md pull-left" />
                              <div className="post-detail">
                                <div className="user-info">
                                  <h5><a href="timeline.html" className="profile-link">Alexis Clark</a> <span className="following">following</span></h5>
                                  <p className="text-muted">Published a photo about 3 mins ago</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                */}
          </div>
        </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(NewsfeedContent2);
