import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Menu extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <ul className="nav navbar-nav navbar-right main-menu">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Home <span><img src="/images/down-arrow.png" alt="" /></span></a>
            <ul className="dropdown-menu newsfeed-home">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Newsfeed <span><img src="/images/down-arrow.png" alt="" /></span></a>
            <ul className="dropdown-menu newsfeed-home">
              <li><Link to='/newsfeed'>Newsfeed</Link></li>
            </ul>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Timeline <span><img src="/images/down-arrow.png" alt="" /></span></a>
          <ul className="dropdown-menu login">
            <li><a>Account Settings</a></li>
            <li><a >Change Password</a></li>
          </ul>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle pages" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span><img src="/images/down-arrow.png" alt="" /></span></a>
          <ul className="dropdown-menu page-list">
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/profile/information'>Update Account</Link></li>
            <li><Link to='/profile/timeline'>Timeline</Link></li>
            <li><Link to='/login'>Logout</Link></li>
          </ul>
        </li>
        <li className="dropdown"><a >Contact</a></li>
      </ul>
    )
  }
}

module.exports = connect( function(state){
  return {};
})(Menu);
