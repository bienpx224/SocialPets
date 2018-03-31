import React from 'react';
import {connect} from 'react-redux';
import Login from 'Login';
import Home from 'Home';
import {set_user,login_error,login_success} from 'userAction';

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
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
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
module.exports = connect( function(state){
  return {isLogin: state.userReducer.isLogin};
})(Homepage);
