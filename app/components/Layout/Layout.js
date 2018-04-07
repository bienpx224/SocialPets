import React from 'react';
import {connect} from 'react-redux';
import Menu from 'Menu';
import Search from 'Search';
import {NavLink,withRouter,Link} from 'react-router-dom';

class Layout extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="content" id="top">

      <div className="header">
        <div className="container">
          <nav className="navbar navbar-default navbar-fixed-top menu">
            <div className="container">

              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>

                </button>
                <a className="navbar-brand" href="#"><Link to='/home'><img src="/images/logo.png" alt="logo" /></Link></a>
              </div>

              <div className="collapse navbar-collapse in" id="bs-example-navbar-collapse-1">
                <Menu />
                <Search />
              </div>

            </div>
          </nav>
        </div>
      </div>
      <a href="#top" alt="top">
        <div className="back-to-top"><a href="#top" alt="top">
          <span className="ion-arrow-up-a"> back to top</span></a>
        </div>
      </a>
      <div id="page-contents">
          {this.props.children}
      </div>

    </div>
    )
  }
}

module.exports = withRouter(connect(function(state){
  return {isLogin: state.userReducer.isLogin, user: state.userReducer.user };
})(Layout));
