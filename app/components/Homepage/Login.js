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
              <h1 className="text-white">Make Cool Friends !!!</h1>
              <p>Friend Finder is a social network template that can be used to connect people. The template offers Landing pages, News Feed, Image/Video Feed, Chat Box, Timeline and lot more. <br /> <br />Why are you waiting for? Buy it now.</p>
              <button className="btn btn-primary">Learn More</button>
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
