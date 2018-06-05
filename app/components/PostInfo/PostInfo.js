import React from 'react';
import {connect} from 'react-redux';
import NewsfeedContent from 'NewsfeedContent';
import Login from 'Login';
import Notfound from 'Notfound';
import MenuLeft from 'MenuLeft';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';
import {get_person,set_user,login_error,login_success} from 'userAction';

class PostInfo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLogin : false,
      isNotfound: false,
      loading : true,
      data: {}
    }
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
  getPostById(){
    let {id} = this.props.match.params;
    io.socket.post('/post/getPostById',{id},(resData, jwres)=>{
      if(resData.err){
        this.setState({loading:false, data: {}, isNotfound: true})
      }
      if(resData.post){
        this.setState({loading:false, data: resData.post, isNotfound: false})
      }
    })
  }
  componentDidMount(){
    this.checkLogin();
    this.getPostById();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.isLogin){
      this.setState({...this.state,isLogin: nextProps.isLogin});
    }
  }
  render(){
    let renderPost = this.state.loading===false?<NewsfeedContent type="all" data={this.state.data} owner={this.state.data.userId} />:<h1>dang loading</h1>;
    if(this.state.isLogin === false){
      return ( <Login />)
    }if(this.state.isNotfound === true){
      return ( <Notfound /> )
    }
    else{
      return(
        <div className="container" style={{marginLeft:"0%"}}>
            <MenuLeft />
            <div className="col-md-10 fixed-content">

              {renderPost}

            </div>
        </div>
      )
    }
  }
}
module.exports = (connect( function(state){
  return {isLogin: state.userReducer.isLogin, user:state.userReducer.user};
})(PostInfo));
