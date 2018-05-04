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
import {get_post_err, get_postNewsfeed} from 'postAction';

class Home extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLogin : false,
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }
  componentDidMount(){
    var {dispatch} = this.props;
    let that = this;
    if(localStorage.email){
      console.log("localStorage", localStorage.email);
    }else{ console.log("khong ton tai email in local")}
    io.socket.post('/user/getUser', {email:localStorage.email}, function(resData, jwres){
      console.log("getUser: ", resData);
      if(resData.error){
        dispatch(login_error());
      }
      if(resData.notFound){
        dispatch(login_error());
      }else{
        dispatch(login_success(resData.user));
      }
    });

    io.socket.on('notify', (data) => { console.log(data);
      let related_userId = data.data.related_userId;
      if((related_userId.id === this.props.user.id)&&(related_userId.id !== data.data.userId.id)){
        that.msg.show(<Notify data={data.data} />)
        document.getElementById('sound').play();
        if(!document.hasFocus()){
        }
      }
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({...this.state,isLogin: nextProps.isLogin});
  }

  render(){
    if(!this.state.isLogin){
      return ( <Login /> )
    }else{
      return(
      <div className="container" style={{marginLeft:"0%"}}>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <audio id='sound' preload='auto'>
          <source src='/sound/notify.mp3' type='audio/mpeg' />
          <embed hidden='true' loop='false' src='/sound/notify.mp3' />
        </audio>
        <MenuLeft />

        <IndexHome />

        <IndexListRecommend />

      </div>
      )
    }
  }
}
module.exports = withRouter(connect( function(state){
  return {user: state.userReducer.user, isLogin: state.userReducer.isLogin};
})(Home));
