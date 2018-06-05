import React from 'react';
import {connect} from 'react-redux';
import Newsfeed from 'Newsfeed';
import Login from 'Login';
import ChatRoom from 'ChatRoom';
import Notfound from 'Notfound';
import Feedback from 'Feedback';
import UserManagement from 'UserManagement';
import Notification from 'Notification';
import PostWeek from 'PostWeek';
import FindUser from 'FindUser';
import {login_error,login_success} from 'userAction';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';

class IndexHome extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    var {dispatch} = this.props;
    let that = this;
    this.checkLogin();
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
  componentWillReceiveProps(nextProps){
    this.setState({...this.state,isLogin: nextProps.isLogin});
  }
  render(){
    if(!this.props.isLogin){
      return ( <Login />)
    }else{
      return(
          <Switch>
                <Route  exact path="/" component={Newsfeed} />
                <Route  exact path="/home" component={Newsfeed} />
                <Route  exact path="/newsfeed" component={Newsfeed} />
                <Route  exact path="/newsfeed/notify" component={ChatRoom} />
                <Route  exact path="/newsfeed/topImage" component={PostWeek} />
                <Route  exact path="/newsfeed/chatroom" component={ChatRoom} />
                <Route  exact path="/newsfeed/notification" component={Notification} />
                <Route  exact path="/newsfeed/feedback" component={Feedback} />
                <Route  exact path="/newsfeed/listuser" component={UserManagement} />
                <Route  exact path="/newsfeed/search" component={FindUser} />
                <Route  exact path="/newsfeed/search/:type" component={FindUser} />
                <Route render={function(){
                  return <Notfound />
                } } />
          </Switch>
      )
    }
  }
}
module.exports = withRouter(connect( function(state){
  return {user: state.userReducer.user,isLogin: state.userReducer.isLogin};
})(IndexHome));
