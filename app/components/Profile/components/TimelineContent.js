import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import NewsfeedContent from 'NewsfeedContent';
import {set_user, open_popup_user,get_post_err,get_postNewsfeed} from 'userAction';

class TimelineContent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
          <div className="post-content">

                <div className="post-date hidden-xs hidden-sm">
                  <h5>{this.props.user.name}</h5>
                  <p className="text-grey">Sometimes ago</p>
                </div>
                <NewsfeedContent key="1" content={this.props.user.address} image={this.props.user.picture} title="no title" createdAt={this.props.user.createdAt} owner={this.props.user} />

          </div>

      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(TimelineContent);