import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Post from 'Post';
import TimelineContent from 'TimelineContent';
import {set_user, open_popup_user,get_post_err,get_postNewsfeed} from 'userAction';

class Timeline extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
    <div>
      <div className="col-md-3"></div>
      <div className="col-md-8">
              <Post />
              <TimelineContent />
      </div>
    </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Timeline);