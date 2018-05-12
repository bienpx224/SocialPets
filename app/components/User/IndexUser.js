import React from 'react';
import {connect} from 'react-redux';
import Information from 'Information';
import ListFollowers from 'ListFollowers';
import ListFollowings from 'ListFollowings';
import Timeline from 'Timeline';
import Notfound from 'Notfound';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';

class IndexUser extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div id="page-contents">
        <div className="row">
          <div className="col-md-12">

              <Switch>
                  <Route  exact path="/user" render={ ()=>{ return <Timeline type="person" />} } />
                  <Route  exact path="/user/:email" render={ ()=>{ return <Timeline type="person" />} } />
                  <Route  exact path="/user/:email/timeline" render={ ()=>{ return <Timeline type="person" />} } />
                  <Route  exact path="/user/:email/information" render={ ()=>{ return <Information type="person" />} } />
                  <Route  exact path="/user/:email/followers" render={ ()=>{ return <ListFollowers type="person" />} } />
                  <Route  exact path="/user/:email/followings" render={ ()=>{ return <ListFollowings type="person" />} } />
                  <Route render={function(){
                    return <Notfound />
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
})(IndexUser));
