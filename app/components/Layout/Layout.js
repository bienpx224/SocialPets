import React from 'react';
import {connect} from 'react-redux';
import Header from 'Header';
import Footer from 'Footer';
import Loadable from 'react-loading-overlay';
import {NavLink,withRouter,Link} from 'react-router-dom';
import {change_loading} from 'userAction';

class Layout extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
    }
  }
  componentWillReceiveProps(nextProps){ 
      this.state.loading = nextProps.loading;
      this.setState(this.state);
  }
  render(){
    return(
      <div className="content">
        <Loadable active={this.state.loading} zIndex={9999} spinner text='Loading your content...' >
          <Header />

          <a href="#top" alt="top">
            <div className="back-to-top"><a href="#top" alt="top">
              <span className="ion-arrow-up-a"> Back to top</span></a>
            </div>
          </a>
          <div id="page-contents">

              {this.props.children}

          </div>
          <Footer />
        </Loadable>
      </div>
    )
  }
}

module.exports = withRouter(connect(function(state){
  return {loading: state.userReducer.loading };
})(Layout));
