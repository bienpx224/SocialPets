import React from 'react';
import {connect} from 'react-redux';
import time from 'time-ago';
import {Link} from 'react-router-dom';

class FeedbackItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render(){
    var date = new Date(this.props.data.createdAt);
    let timeMsg = date.getTime();
    let renderCreateTime = time.ago(new Date()-(new Date()-timeMsg));
    let renderRead = this.props.data.isRead === true?"info":"danger";
    let renderImg = this.props.data.image?<a target="_blank" href={this.props.data.image}><img className="profile-photo" src={this.props.data.image} /></a>:null;
    return (
      <tr className={renderRead}>
        <th scope="row">{renderCreateTime}</th>
        <td><Link to={"/user/"+this.props.data.userId.email}>{this.props.data.userId.email}</Link></td>
        <td>{this.props.data.title}</td>
        <td>{renderImg}</td>
        <td>{this.props.data.content}</td>
      </tr>
    )
  }
}

module.exports = connect(function(state){
return {};
})(FeedbackItem);
