import React from 'react';
import {connect} from 'react-redux';
import Header from 'Header';
import Footer from 'Footer';
import {NavLink,withRouter,Link} from 'react-router-dom';

class Layout extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="content">

      <Header />

      <a href="#top" alt="top">
        <div className="back-to-top"><a href="#top" alt="top">
          <span className="ion-arrow-up-a"> Back to top</span></a>
        </div>
      </a>
      <div id="page-contents">
          {this.props.children}
      </div>
      <Footer />
    </div>
    )
  }
}

module.exports = withRouter(connect(function(state){
  return {isLogin: state.userReducer.isLogin, user: state.userReducer.user };
})(Layout));
