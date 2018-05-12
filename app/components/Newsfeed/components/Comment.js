import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import {Link} from 'react-router-dom';

class Comment extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user : {},
      load : false
    }
  }
  componentDidMount(){
    let that = this;
    let userId = this.props.data.userId;
    io.socket.post('/user/getUserById',{userId},function(resData, jwres){
      if(resData.user){
        that.state.user = resData.user;
        that.state.load = true;
        that.setState(that.state);
      }
    })
  }
  render(){
    let avatar = this.state.load===false?"/images/data/defaultAvatar.jpg":this.state.user.picture;
    let name = this.state.load===false?this.props.data.userId:this.state.user.name;
    return(
        <div className="post-comment">
          <Link to={"/user/"+this.state.user.email}><img src={avatar} alt="" className="profile-photo-sm" /></Link>
          <p><Link to={"/user/"+this.state.user.email} className="profile-link">{name} </Link>
          <i className="em em-laughing"></i> {this.props.data.content} </p>
        </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Comment);
