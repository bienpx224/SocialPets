import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Post from 'Post';
import NewsfeedContent2 from 'NewsfeedContent2';

class PostWeek extends React.Component{
  constructor(props){
    super(props);
  }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 1000,
    transition: 'scale'
  }
  render(){
    return(
      <div className="col-md-7 fixed-content" >
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <Post />
        {this.props.topImageOfWeek.map((i,index)=>{
          return (
            <div className="media col-md-6 col-sm-12" key={index}>
              <NewsfeedContent2 key={index} data={i} owner={i.userId} />
            </div>
          )
        })
        }
      </div>
    )
  }
}

module.exports = connect( function(state){
  return {user: state.userReducer.user, topImageOfWeek: state.postReducer.topImageOfWeek};
})(PostWeek);
