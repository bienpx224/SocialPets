 import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user, open_popup_user} from 'userAction';
import PopupUser from 'PopupUser';
import {Link} from 'react-router-dom';

class MenuVertical extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user : false
    }
  }
  componentWillReceiveProps(nextProps){ console.log("nextProps: ", nextProps);
    if(!this.state.user && nextProps.user){
      this.setState({user: nextProps.user});
    }
  }
  showPopupUser(){
    var {dispatch} = this.props;
    dispatch(open_popup_user());
  }
  render(){
    let cover = this.state.user.cover;
    let styleProfile = {
      cursor: 'pointer',
      backgroundImage: 'linear-gradient(rgba(94, 174, 206, 0), rgba(125, 164, 193, 0.8)),url(' + cover + ')',
      backgroundSize : 'cover',

    }
    return(
      <div>
      <PopupUser />
        <div className="profile-card" style={styleProfile} onClick={this.showPopupUser.bind(this)}>
          <img src={this.state.user.picture} alt="user" className="profile-photo" />
          <h5>
            <Link to="/profile/timeline" className="text-white">{this.state.user.name}</Link>
          </h5>
          <a href="#" className="text-white">
            <i className="ion ion-android-person-add">1,200 followers</i>
          </a>
        </div>

        <ul className="nav-news-feed">
          <li>
            <i className="icon ion-ios-paper"></i>
            <div>
              <Link to='/home/newsfeed'>Newsfeed</Link>
            </div>
          </li>
          <li>
            <i className="icon ion-chatboxes"></i>
            <div>
              <Link to='/home/chatroom'>ChatRoom</Link>
            </div>
          </li>
          <li>
            <i className="icon ion-ios-people"></i>
            <div>
              <a href="#">People Nearby</a>
            </div>
          </li>
          <li>
            <i className="icon ion-ios-people-outline"></i>
            <div>
              <a href="#">Followings</a>
            </div>
          </li>
          <li>
            <i className="icon ion-images"></i>
            <div>
              <a href="#">Images</a>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(MenuVertical);
