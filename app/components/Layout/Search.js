import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Search extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <form className="navbar-form navbar-right hidden-sm">
        <div className="form-group">
          <i className="icon ion-android-search"></i>
          <Link to="/newsfeed/search"><input type="button" className="form-control" placeholder="Search friends, photos, videos"/></Link>
        </div>
      </form>
    )
  }
}
module.exports = connect( function(state){
  return {}
})(Search);
