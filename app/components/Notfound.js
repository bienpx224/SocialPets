import React from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';

class Notfound extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="error-page">
      <div className="error-content">
        <div className="container">
          <img src="/images/404.png" alt="" className="img-responsive" />
          <div className="error-message">
          	<h1 className="error-title">Whoops!</h1>
          	<p>Looks like you are lost. But dont worry there is plenty to see!!</p>
          </div>
          <form className="search-form">
            <div className="form-group">
            </div>
            <Link to="/"><button className="btn btn-primary">Homepage</button></Link>
          </form>
        </div>
    	</div>
    </div>
    )
  }
}
module.exports = withRouter(connect( function(state){
  return {user: state.userReducer.user};
})(Notfound));
