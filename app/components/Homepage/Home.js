import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {setUserLocalStorage} from 'authenticated';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink,withRouter} from 'react-router-dom';
import {set_user,login_error,login_success} from 'userAction';
import MenuLeft from 'MenuLeft';
import Login from 'Login';
import Newsfeed from 'Newsfeed';
import ChatRoom from 'ChatRoom';
import Notify from 'Notify';
import IndexHome from 'IndexHome';
import IndexListRecommend from 'IndexListRecommend';
import Loadable from 'react-loading-overlay';
import {get_post_err, get_postNewsfeed, get_top_image} from 'postAction';
import {get_list_inbox, get_list_msg, get_inbox} from 'chatAction';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLogin : false,
      loading: true,
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }
  checkLogin(){
    let {dispatch} = this.props;
    if(!localStorage.email){
      console.log('ko co user local')
    }else{
    io.socket.post('/user/getUser', {email:localStorage.email}, function(resData, jwres){
        console.log('co user local: ',resData.user.email)
      if(resData.error){
        // this.setState({isLogin:false})
        dispatch(login_error());
      }
      if(resData.notFound){
        // this.setState({isLogin:false})
        dispatch(login_error());
      }else{
        // this.setState({isLogin:true})
        dispatch(login_success(resData.user));
      }
    });
  }
}
  componentDidMount(){
    var {dispatch} = this.props;
    let that = this;
    this.checkLogin();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.isLogin){
      this.state.isLogin = nextProps.isLogin;
      this.setState(this.state);
    }
  }

  render(){
    if(!this.state.isLogin){
      return ( <Login /> )
    }else{
      return(
      <div className="container" style={{marginLeft:"0%"}}>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />

        <MenuLeft />

        <IndexHome />

        <IndexListRecommend />

      </div>
      )
    }
  }
}
module.exports = withRouter(connect( function(state){
  return {user: state.userReducer.user, isLogin: state.userReducer.isLogin, loading:state.userReducer.loading};
})(Home));
