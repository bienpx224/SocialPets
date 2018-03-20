import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {setUserLocalStorage} from 'authenticated';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink} from 'react-router-dom';
import {set_user} from 'userAction';
import MenuLeft from 'MenuLeft';
import Newsfeed from 'Newsfeed';
import ChatRoom from 'ChatRoom';
import {get_post_err, get_postNewsfeed} from 'postAction';

class Home extends React.Component{
  constructor(props){
    super(props);
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 5000,
    transition: 'scale'
  }
  componentWillMount(){
    var {dispatch} = this.props; console.log("localStorage", localStorage.email);
    io.socket.post('/user/getUser', {email:localStorage.email}, function(resData, jwres){
      if(resData.error){
      }
      if(resData.notFound){
      }else{
        dispatch(set_user(resData.user));
      }
    });
  }
  render(){

    return(
    <div className="container" style={{marginLeft:"0%"}}>

      <MenuLeft />
      <Switch>
              <Route  exact path="/" component={Newsfeed} />
              <Route  exact path="/home" component={Newsfeed} />
              <Route  exact path="/home/newsfeed" component={Newsfeed} />
              <Route  exact path="/home/chatroom" component={ChatRoom} />
              <Route render={function(){
                return <p> not found in home</p>
            } } />
      </Switch>
      <div className="col-md-2 static">

      </div>
    </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Home);
