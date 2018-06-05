import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import FeedbackItem from 'FeedbackItem';
import NotificationItem from 'NotificationItem';
import ReactPlaceholder from 'react-placeholder';
import {get_notify} from 'userAction';

class Feedback extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listFeedback: [],
    }
  }
  componentDidMount(){
    let userId = this.props.user.id;
    let {dispatch} = this.props;
    io.socket.post('/feedback/getListFeedback',{},(resData, jwres)=>{
      if(resData.listFeedback){ 
        this.state.listFeedback = resData.listFeedback;
        this.setState(this.state);
      }else{
        console.log("ERROR GET LIST FEEDback: ",resData.err);
      }
    })

    io.socket.post('/feedback/setIsRead',{},(resData, jwres)=>{
      if(resData.listFeedback){
      }else{
        console.log("ERROR SET IS READ LIST FEEDback: ",resData.err);
      }
    })

  }
  render(){
    return (
      <div className="col-md-7 static fixed-content">
          <div className="row">
            <div className="border-chat">
              <h2 style={{textAlign:"center"}}>FEEDBACK </h2>
            </div>
          </div>
        <div className="chat-room">
          <div className="row">

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">User </th>
                <th scope="col">Title</th>
                <th scope="col">Image</th>
                <th scope="col">Desciption</th>
              </tr>
            </thead>
            <tbody>
            {this.state.listFeedback.map( (value, key)=>{
                return(
                    <FeedbackItem key={key} data={value} />
                )
            })}
            </tbody>
          </table>

            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user, listNotify: state.userReducer.listNotify};
})(Feedback);
