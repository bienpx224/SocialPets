import React from 'react';
import {connect} from 'react-redux';

class ChatMessage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
          <div className="col-md-7">
                  <div className="tab-content scrollbar-wrapper wrapper scrollbar-outer" id="style-11">
                    <div className="tab-pane active">
                      <div className="chat-body">
                        <ul className="chat-message">
                          <li className="left">
                            <img src="images/users/user-2.jpg" alt="" className="profile-photo-sm pull-left" />
                            <div className="chat-item">
                              <div className="chat-item-header">
                                <h6>Biển Phạm</h6>
                                <small className="text-muted">3 days ago</small>
                              </div>
                              <p>Hi honey, how are you doing???? Long time no see. Where have you been?</p>
                            </div>
                          </li>
                          <li className="right">
                            <img src="images/users/user-1.jpg" alt="" className="profile-photo-sm pull-right" />
                            <div className="chat-item">
                              <div className="chat-item-header">
                                <h5>Sarah Cruiz</h5>
                                <small className="text-muted">3 days ago</small>
                              </div>
                              <p>I have been on vacation</p>
                            </div>
                          </li>
                          <li className="right">
                            <img src="images/users/user-1.jpg" alt="" className="profile-photo-sm pull-right" />
                            <div className="chat-item">
                              <div className="chat-item-header">
                                <h5>Sarah Cruiz</h5>
                                <small className="text-muted">3 days ago</small>
                              </div>
                              <p>it was a great time for me. we had a lot of fun <i className="em em-blush"></i></p>
                            </div>
                          </li>
                          <li className="left">
                            <img src="images/users/user-2.jpg" alt="" className="profile-photo-sm pull-left" />
                            <div className="chat-item">
                              <div className="chat-item-header">
                                <h5>Linda Lohan</h5>
                                <small className="text-muted">3 days ago</small>
                              </div>
                              <p>thats cool I wish I were you <i className="em em-expressionless"></i></p>
                            </div>
                          </li>
                          <li className="right">
                            <img src="images/users/user-1.jpg" alt="" className="profile-photo-sm pull-right" />
                            <div className="chat-item">
                              <div className="chat-item-header">
                                <h5>Sarah Cruiz</h5>
                                <small className="text-muted">3 days ago</small>
                              </div>
                              <p><i className="em em-hand"></i></p>
                            </div>
                          </li>
                          <li className="left">
                            <img src="images/users/user-2.jpg" alt="" className="profile-photo-sm pull-left" />
                            <div className="chat-item">
                              <div className="chat-item-header">
                                <h5>Linda Lohan</h5>
                                <small className="text-muted">a min ago</small>
                              </div>
                              <p>Hi there, how are you</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="send-message">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Type your message"/>
                      <span className="input-group-btn">
                        <button className="btn btn-default" type="button">Send</button>
                      </span>
                    </div>
                  </div>
                </div>

    )
  }
}

module.exports = connect(function(state){
return {user: state.userReducer.user};
})(ChatMessage);
