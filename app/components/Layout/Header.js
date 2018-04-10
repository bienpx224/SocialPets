import React from 'react';
import {connect} from 'react-redux';
import Menu from 'Menu';
import Search from 'Search';
import {NavLink,withRouter,Link} from 'react-router-dom';

class Header extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <header id="header">
        <nav className="navbar navbar-default navbar-fixed-top menu">
          <div className="container">


            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand"><Link to='/'><img src="/images/logo.png" alt="logo" /></Link></a>
            </div>


            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              <Menu />
              <Search />

            </div>
          </div>
        </nav>
      </header>
    )
  }
}

module.exports = withRouter(connect(function(state){
  return { };
})(Header));
