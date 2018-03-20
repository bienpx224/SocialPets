import React from 'react';
import {connect} from 'react-redux';
import Login from 'Login';
import Home from 'Home';

class Homepage extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render(){
    var renderContent = null;
    if(localStorage.email){
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
