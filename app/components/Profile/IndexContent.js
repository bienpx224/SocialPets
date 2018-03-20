import React from 'react';
import {connect} from 'react-redux';
import Information from 'Information';
import ListFollowers from 'ListFollowers';
import Timeline from 'Timeline';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';

class IndexContent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div id="page-contents">
        <div className="row">
          <div className="col-md-12">

              <Switch>
                        <Route  exact path="/profile" component={Timeline} />
                        <Route  exact path="/profile/timeline" component={Timeline} />
                        <Route  exact path="/profile/information" component={Information} />
                        <Route  exact path="/profile/followers" component={ListFollowers} />
                        <Route render={function(){
                          return <p> not found in profile</p>
                      } } />
                </Switch>

          </div>
        </div>
      </div>
    )
  }
}
module.exports = withRouter(connect( function(state){
  return {user: state.userReducer.user};
})(IndexContent));