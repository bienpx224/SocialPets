import React from 'react';
import {connect} from 'react-redux';
import Menu from 'Menu';
import Search from 'Search';
import {NavLink,withRouter,Link} from 'react-router-dom';

class Footer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
        <footer id="footer">
          <div className="container">
          	<div className="row">
              <div className="footer-wrapper">
                <div className="col-md-3 col-sm-3">
                  <a ><Link to='/'><img src="/images/logo.png" alt="" className="footer-logo" /></Link></a>
                  <ul className="list-inline social-icons">
                  	<li><a href="https://www.facebook.com/bienpham224"><i className="icon ion-social-facebook"></i></a></li>
                  	<li><a href="#"><i className="icon ion-social-twitter"></i></a></li>
                  	<li><a href="#"><i className="icon ion-social-googleplus"></i></a></li>
                  	<li><a href="#"><i className="icon ion-social-pinterest"></i></a></li>
                  	<li><a href="#"><i className="icon ion-social-linkedin"></i></a></li>
                  </ul>
                </div>
                <div className="col-md-2 col-sm-2">
                  <h5>For individuals</h5>
                  <ul className="footer-links">
                    <li><a href="">Signup</a></li>
                    <li><a href="">login</a></li>
                    <li><a href="">Add pet</a></li>
                    <li><a href="">Finder friend</a></li>
                    <li><a href="">Chat</a></li>
                    <li><a href="">Upload image</a></li>
                  </ul>
                </div>
                <div className="col-md-2 col-sm-2">
                  <h5>For businesses</h5>
                  <ul className="footer-links">
                    <li><a href="">Find people</a></li>
                    <li><a href="">Advertising pet</a></li>
                    <li><a href="">Purchase pet</a></li>
                    <li><a href="">Chat</a></li>
                  </ul>
                </div>
                <div className="col-md-2 col-sm-2">
                  <h5>About</h5>
                  <ul className="footer-links">
                    <li><a href="">About us</a></li>
                    <li><a href="">Contact us</a></li>
                    <li><a href="">Privacy Policy</a></li>
                    <li><a href="">Terms</a></li>
                    <li><a href="">Help</a></li>
                  </ul>
                </div>
                <div className="col-md-3 col-sm-3">
                  <h5>Contact Us</h5>
                  <ul className="contact">
                    <li><i className="icon ion-ios-telephone-outline"></i>01647 168 730</li>
                    <li><i className="icon ion-ios-email-outline"></i>bienpx224@gmail.com</li>
                    <li><i className="icon ion-ios-location-outline"></i>Đại học Bách khoa Hà Nội, Việt Nam</li>
                  </ul>
                </div>
              </div>
          	</div>
          </div>
    		</footer>
    )
  }
}

module.exports = withRouter(connect(function(state){
  return { };
})(Footer));
