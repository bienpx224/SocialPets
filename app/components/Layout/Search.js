import React from 'react';
import {connect} from 'react-redux';

class Search extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <form className="navbar-form navbar-right hidden-sm">
        <div className="form-group">
          <i className="icon ion-android-search"></i>
          <input type="text" className="form-control" placeholder="Search friends, photos, videos"/>
        </div>
      </form>
    )
  }
}
module.exports = connect( function(state){
  return {}
})(Search);
