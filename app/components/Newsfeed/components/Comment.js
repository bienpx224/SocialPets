import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import {Link} from 'react-router-dom';

class Comment extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    let avatar = this.props.data.userId.picture;
    let name = this.props.data.userId.name;
    return(
        <div className="post-comment">
          <Link to={"/user/"+this.props.data.email}><img src={avatar} alt="" className="profile-photo-sm" /></Link>
          <p><Link to={"/user/"+this.props.data.email} className="profile-link">{name} </Link>
          <i className="em em-laughing"></i> {this.props.data.content} </p>
        </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Comment);
