import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import NewsfeedContent2 from 'NewsfeedContent2';
import {Link} from 'react-router-dom';

class Chatlist extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillReceiveProps(nextProps){

  }
  render(){
    return(
        <div id="chat-block">
        <Link to="/newsfeed/topImage">
          <div className="title">Top Image of Week</div>
          <ul className="online-users list-inline">
            {this.props.topImageOfWeek.map( (value, key)=>{
              if(key === 0) return <NewsfeedContent2 data={value} key={key} />
            })}
          </ul>
        </Link>
        </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user, topImageOfWeek: state.postReducer.topImageOfWeek};
})(Chatlist);
