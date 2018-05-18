import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {open_popup_feedback} from 'userAction';
import PopupFeedback from 'PopupFeedback';

class Menu extends React.Component{
  constructor(props){
    super(props);
  }
  showPopupFeedback(){
    let {dispatch} = this.props;
    dispatch(open_popup_feedback());
  }
  renderAdmin = ()=>{
    if(this.props.user.isAdmin === true){
      return (
        <div>
          <li><Link to='/newsfeed/feedback'>Feedback Management</Link></li>
          <li><Link to='/newsfeed/listuser'>User Management</Link></li>
        </div>
      )
    }else{
      return null;
    }
  }
  handleLogout(){
    localStorage.removeItem("email");
  }
  render(){
    let renderAdmin = this.renderAdmin();
    return(
      <ul className="nav navbar-nav navbar-right main-menu">
      <PopupFeedback />
        <li className="dropdown">
          <a href="#" className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Home <span><img src="/images/down-arrow.png" alt="" /></span></a>
            <ul className="dropdown-menu newsfeed-home">
              <li><Link to='/home'>Home</Link></li>
              <li><Link to='/newsfeed'>Newsfeed</Link></li>
            </ul>
        </li>
        <li className="dropdown">
          <Link to='/newsfeed/notification'>Notification</Link>
        </li>
        <li className="dropdown">
          <Link to='/newsfeed/chatroom'>Chatroom</Link>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span><img src="/images/down-arrow.png" alt="" /></span></a>
          <ul className="dropdown-menu page-list">
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/profile/information'>Update Account</Link></li>
            <li><Link to='/profile/timeline'>Timeline</Link></li>
            <li><Link to='/profile/followers'>Followers</Link></li>
            <li><Link to='/profile/followings'>Followings</Link></li>
            <li onClick={this.handleLogout.bind(this)}><Link to='/login'>Logout</Link></li>
          </ul>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">About <span><img src="/images/down-arrow.png" alt="" /></span></a>
            <ul className="dropdown-menu newsfeed-home">
              <li><Link to='/home'>Contact</Link></li>
              <li onClick={this.showPopupFeedback.bind(this)}><a style={{cursor:"pointer"}}>Feedback</a></li>
              {renderAdmin}
            </ul>
        </li>
      </ul>
    )
  }
}

module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Menu);
