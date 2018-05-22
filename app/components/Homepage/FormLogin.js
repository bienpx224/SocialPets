import React from 'react';
import {connect} from 'react-redux';
import {login_success} from 'userAction';
import AlertContainer from 'react-alert';
import {Redirect } from 'react-router-dom';
import {setUserLocalStorage} from 'authenticated';

class FormLogin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLogin : false
    }
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 2000,
    transition: 'scale'
  }
  handleSubmit(event){
    var {dispatch} = this.props;
    var that = this;
    event.preventDefault();
    var Obj = {
      email: this.refs.email.value,
      password: this.refs.password.value
    }
    if(Obj.email === "" || Obj.password === ""){
      that.msg.show('ERROR: Email and Password must be fill !! ', {
                            type: 'error',
                            icon: <img src="/images/error.png" />
            })
    }else{
      io.socket.post('/user/login',Obj,function(resData, jwres){
          if(resData.error){
            that.msg.show('ERROR: '+resData.error, {
                            type: 'error',
                            icon: <img src="/images/error.png" />
            })
          }else{
            if(resData.user){
              localStorage.email = resData.user.email;
              dispatch(login_success(resData.user));
              console.log("login success");
              that.setState({isLogin:true});
            }
          }
      });
    }
  }

  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  render(){
    var renderLogin = this.state.isLogin ? <Redirect to='/home' /> : null;
    return(
      <div className="tab-pane active" id="login" style={{marginTop:"80px", marginLeft:"30px"}} >
      {renderLogin}
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                  <h3 style={{textAlign:"center"}}>Login</h3>
                  <p className="text-muted">Log into your account</p>

                  <form name="Login_form" id='Login_form'>
                     <div className="row">
                      <div className="form-group col-xs-12">
                        <label htmlFor="my-email" className="sr-only">Email</label>
                        <input onKeyPress={this.handleKeyPress.bind(this)} id="my-email" ref="email" className="form-control input-group-lg" type="text" name="Email" title="Enter Email" placeholder="Your Email"/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-xs-12">
                        <label htmlFor="my-password" className="sr-only">Password</label>
                        <input defaultValue="123456" onKeyPress={this.handleKeyPress.bind(this)} id="my-password" ref="password" className="form-control input-group-lg" type="password" name="password" title="Enter password" placeholder="Password"/>
                      </div>
                    </div>
                  </form>
            <p><a href="#">Forgot Password?</a></p>
            <button onClick={this.handleSubmit.bind(this)} className="btn btn-primary">Login Now</button>

      </div>

    )
  }
}
module.exports = connect( function(state){
  return {}
})(FormLogin);
