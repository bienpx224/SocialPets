import React from 'react';
import {connect} from 'react-redux';
import FormLoginReg from 'FormLoginReg';

class Login extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div id="lp-register" style={{padding:"50px 0px 30px 0px", overflow:"hidden", height:"100%"}}>
      <div className="container">
        <div className="row">

          <div className="col-sm-5">
            <div className="intro-texts">
              <h1 className="text-white">World of Pets!!!</h1>
              <p>Social Pets is a social network that can be used to connect people. Social Pets is place where you use News Feed, Image/Video Feed, Chat Box, Timeline and lot more to relax, share your pet and connect to everyone. <br /> <br />Why are you waiting for? Let join with us.</p>
            </div>
          </div>

          <FormLoginReg />

        </div>
      </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {}
})(Login);
