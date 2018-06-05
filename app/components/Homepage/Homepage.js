/////////////////////// KHOONG DUNG DEN COMPONENT NAY NUA //////////////////////////

import React from 'react';
import {connect} from 'react-redux';
import Login from 'Login';
import Home from 'Home';
import {set_user,login_error,login_success} from 'userAction';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';

class Homepage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLogin: false
    }
  }
  componentDidMount(){
    var {dispatch} = this.props;
    let that = this;
    if(localStorage.email){
    }else{
    io.socket.post('/user/getUser', {email:localStorage.email}, function(resData, jwres){

      if(resData.error){
        dispatch(login_error());
      }
      if(resData.notFound){
        dispatch(login_error());
      }else{
        dispatch(login_success(resData.user));
      }
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({...this.state,isLogin: nextProps.isLogin});
  }
  render(){
    var renderContent = null;
    if(this.state.isLogin){
      renderContent = <Home />;
    }else{
      renderContent = <Login />;
    }

    return(
      <div>
        {renderContent}
      </div>
    )
  }
}
module.exports = withRouter(connect( function(state){
  return {isLogin: state.userReducer.isLogin};
})(Homepage));
