import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';

class Pet extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let cssDelete={
      height:"100%",
      width: "auto",
      marginLeft: "20px",
    }
    return(
      <div className="feed-item">
        <div className="live-activity">
          <div className="col-xs-12">
            <div className="col-xs-3 profile-info">
              <img src={this.props.data.image} className="profile-photo-lg pull-left" />
            </div>
            <div className="col-xs-7 profile-info" >
              <h3>Name : {this.props.data.name}</h3>
              <p>Type : {this.props.data.type}</p>
              <p>Description: {this.props.data.description}</p>
            </div>
            <div className="col-xs-2">
              <button style={cssDelete} className="btn btn-danger" >
                <span style={{fontSize:"20px"}} className="ion-close-circled pull-left"></span>
              </button>
            </div>
          </div>
          <p className="text-muted">{this.props.data.createdAt}</p>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(Pet);
