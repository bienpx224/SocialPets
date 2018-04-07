import React from 'react';
import {connect} from 'react-redux';

class Follower extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="col-md-6 col-sm-6">
          <div className="friend-card">
            <img src={this.props.cover} alt="profile-cover" className="img-responsive cover" />
            <div className="card-info">
              <img src={this.props.picture} alt="user" className="profile-photo-lg" />
              <div className="friend-info">
                <a href="#" className="pull-right text-green">Followed</a>
                <h5><a href="#" className="profile-link">{this.props.name}</a></h5>
                <p>{this.props.email}</p>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Follower);
