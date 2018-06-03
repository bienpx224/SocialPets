import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import NewsfeedContent from 'NewsfeedContent';
import ReactPlaceholder from 'react-placeholder';

class FindPost extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){
  }
  render(){
    return(
          <div>
            {this.props.listPost.map( (v,k)=>{
              return(
                <NewsfeedContent key={k} data={v} owner={v.userId} />
              )
            })}
          </div>
    )
  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user};
})(FindPost);
