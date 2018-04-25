import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import Comment from 'Comment';

class NewsfeedContent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      react : this.props.data.react.length,
      isReact : false,
      listComment : this.props.data.comments
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 2000,
    transition: 'scale'
  }
  componentDidMount(){

  }
  handleType(event){
    var k = event.keyCode;
    if(k == 13){
      let content = this.refs.content.value;   let that = this;
      if(content.length === 0) return;
      if(content.length >= 999) return;
      let userId = this.props.user; let postId = this.props.data.id;
      let related_userId = this.props.owner;
      io.socket.post('/comment/addComment',{userId,postId,content,related_userId},function(resData, jwres){
        if(resData.err){
          that.msg.show('ERROR: '+resData.err, {
                            type: 'error',
                            icon: <img src="/images/error.png" />
          })
        }
        if(resData.comment){
          that.state.listComment.push(resData.comment);
          that.setState(that.state);
          that.refs.content.value = "";
        }
      })
    }
  }
  componentWillMount(){
      let userId = this.props.user.id;
      let that = this;
      let arrUser = this.props.data.react;
      arrUser.map( (value, key)=>{
        if(userId === value.userId){
          that.state.isReact = true; that.setState(that.state);
        }
      })
  }
  componentWillReceiveProps(nextProps){
  }
  renderBtnReact(){
    if(this.state.isReact === true){
      return (<a onClick={this.react.bind(this)} className="btn text-green"><i className="ion-ios-heart"></i>{this.state.react}</a>)
    }else{
      return (<a onClick={this.react.bind(this)} className="btn text-red"><i className="ion-ios-heart"></i>{this.state.react}</a>)
    }
  }
  react(){
    let userId = this.props.user.id;
    let postId = this.props.data.id;
    let related_userId = this.props.owner.id;
    let that = this;
    io.socket.post('/react/addReact',{userId, postId, related_userId},function(resData, jwres){
      if(resData.err){
        alert(resData.err);
      }
      if(resData.react){
        that.state.react ++; that.state.isReact = true;
        that.setState(that.state);
      }
      if(resData.ok){
        that.state.react --; that.state.isReact = false;
        that.setState(that.state);
      }
    })
  }
  render(){
    let renderBtnReact = this.renderBtnReact();
    return(
      <div className="post-content">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="post-container">
          <img src={this.props.owner.picture} className="profile-photo-md pull-left" alt="" />
          <div className="post-detail">

                  <div className="user-info">
                    <h5><a href="#" className="profile-link">{this.props.owner.name}</a> <span className="following">following</span></h5>
                    <p className="text-muted">Published a photo time: {this.props.data.createdAt}</p>
                  </div>

                  <div className="line-divider"></div>
                  <img src={this.props.data.image} alt="" className="img-responsive post-image"/>
                  <div className="post-text">
                    <p>{this.props.data.content}<i className="em em-anguished"></i> <i className="em em-anguished"></i> <i className="em em-anguished"></i></p>
                  </div>
                  <div className="">
                    {renderBtnReact}
                  </div>
                  <div className="line-divider"></div>

                  {this.state.listComment.map( (value, key)=>{
                    return (
                      <Comment key={key} data={value} />
                    )
                  })}

                  <div className="post-comment">
                    <img src={this.props.user.picture} alt="" className="profile-photo-sm" />
                    <input type="text" ref="content" className="form-control" onKeyUp={this.handleType.bind(this)} placeholder="Post a comment"/>
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
