import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {BrowserRouter as Router,Route,Switch,Ridirect,hashHistory,Redirect,NavLink} from 'react-router-dom';
import Layout from 'Layout';
import Test from 'Test';
import Login from 'Login';
import Homepage from 'Homepage';
import Home from 'Home';
import Profile from 'Profile';
import Timeline from 'Timeline';
import Information from 'Information';
// import Message from 'Message';

var {Provider} = require('react-redux');
var store = require('store');


class App extends React.Component{
     render(){
        return(
            <Provider store={store}>
            <Router history={hashHistory}>
                  <Layout>
                   <Switch>
                      <Route   exact path="/" component={Home}/>
                      <Route   path="/home" component={Home}/>
                      <Route   exact path="/test" component={Test}/>
                      <Route   exact path="/login" component={Login} />
                      <Route   path='/profile' component={Profile} />
                      <Route render={function(){
                          return <p> not found</p>
                      } } />
                    </Switch>
                  </Layout>
            </Router>
            </Provider>
    )
  }
}

// class App extends React.Component{
//   render(){
//     return(
//            <div>
//            <Provider store={store}>
//               <Layout />
//               <Home />
//           </Provider>
//            </div>
//     )
//   }
// }

module.exports = App;
