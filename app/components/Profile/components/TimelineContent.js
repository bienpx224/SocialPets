import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import NewsfeedContent from 'NewsfeedContent';
import time from 'time-ago';
import {set_user, open_popup_user,get_post_err,get_postNewsfeed} from 'userAction';

class TimelineContent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var date = new Date(this.props.post.createdAt);
    let timeMsg = date.getTime();
    let renderTime = time.ago(new Date()-(new Date()-timeMsg));
    return(
      <div>
          <div className="post-content">

                <div className="post-date hidden-xs hidden-sm">
                  <h5>{this.props.owner.name}</h5>
                  <p className="text-grey">{renderTime}</p>
                </div>
                <NewsfeedContent key={this.props.key} data={this.props.post} owner={this.props.owner} />

          </div>

      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(TimelineContent);
