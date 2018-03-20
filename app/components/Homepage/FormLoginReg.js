import React from 'react';
import {connect} from 'react-redux';
import FormReg from 'FormReg';
import FormLogin from 'FormLogin';

class FormLoginReg extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="col-sm-6 col-sm-offset-1" style={{paddingTop:"30px"}}>
        <div className="reg-form-container">

            <div className="reg-option">
                <ul className="nav nav-tabs">
                    <li className="active"><a href="#login" data-toggle="tab" aria-expanded="true">Login</a></li>
                    <li className=""><a href="#register" data-toggle="tab" aria-expanded="true">Register</a></li>
                </ul>
            </div>

            <div className="tab-content">
                <FormLogin />
                <FormReg />
            </div>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {}
})(FormLoginReg);
