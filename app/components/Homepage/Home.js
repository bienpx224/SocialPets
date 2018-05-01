import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {setUserLocalStorage} from 'authenticated';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink} from 'react-router-dom';
import {set_user,login_error,login_success} from 'userAction';
import MenuLeft from 'MenuLeft';
import Newsfeed from 'Newsfeed';
import ChatRoom from 'ChatRoom';
import Notify from 'Notify';
import IndexListRecommend from 'IndexListRecommend';
import {get_post_err, get_postNewsfeed} from 'postAction';

class Home extends React.Component{
  constructor(props){
    super(props);
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }
  componentDidMount(){
    document.getElementById('sound').play();
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

    io.socket.on('notify', (data) => {
      let related_userId = data.data.related_userId;
      if(related_userId.id === this.props.user.id){
        that.msg.show(<Notify data={data.data} />)
        document.getElementById('sound').play();
        if(!document.hasFocus()){
        }
      }
    });

  }


  render(){
    return(
    <div className="container" style={{marginLeft:"0%"}}>
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      <audio id='sound' preload='auto'>
        <source src='/sound/notify.mp3' type='audio/mpeg' />
        <embed hidden='true' autostart='false' loop='false' src='/sound/notify.mp3' />
      </audio>
      <MenuLeft />
      <Switch>
              <Route  exact path="/" component={Newsfeed} />
              <Route  exact path="/newsfeed" component={Newsfeed} />
              <Route  exact path="/home" component={Newsfeed} />
              <Route  exact path="/home/newsfeed" component={Newsfeed} />
              <Route  exact path="/home/chatroom" component={ChatRoom} />
              <Route render={function(){
                return <p> not found in home</p>
            } } />
      </Switch>

      <IndexListRecommend />

    </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Home);
