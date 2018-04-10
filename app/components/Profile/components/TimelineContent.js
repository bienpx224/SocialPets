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
                  <h5>{this.props.owner.name}</h5>
                  <p className="text-grey">Sometimes ago</p>
                </div>
                <NewsfeedContent key={this.props.key} content={this.props.post.content} image={this.props.post.image} title={this.props.post.title}
                createdAt={this.props.post.createdAt} owner={this.props.owner} />

          </div>

      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(TimelineContent);
