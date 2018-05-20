 import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user, open_popup_user, open_popup_feedback} from 'userAction';
import PopupUser from 'PopupUser';
import PopupFeedback from 'PopupFeedback';
import {Link} from 'react-router-dom';
import {get_list_inbox} from 'chatAction';
import {get_followers} from 'followAction';

class MenuVertical extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listInbox : [],
      listNotify: [],
      listFeedback: [],
      user : false
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.listInbox){
      this.state.listInbox = nextProps.listInbox;
      this.setState(this.state);
    }
    if(nextProps.listNotify){
      this.state.listNotify = nextProps.listNotify;
      this.setState(this.state);
    }
    if(!this.state.user && nextProps.user){
      this.setState({user: nextProps.user});
    }
  }
  componentDidMount(){
        let userId = this.props.user.id;
        let that = this;
        let {dispatch} = this.props;
        io.socket.post('/inbox/getListInbox',{userId,name:""},(resData, jwres)=>{
          if(resData.err){
            alert("lỗi trong MenuVertical getListInbox");
          }
          if(resData.listInbox){
            dispatch(get_list_inbox(resData.listInbox));
          }
        })

        this.getListFollowers(this.props.user);
  }
  showPopupFeedback(){
    let {dispatch} = this.props;
    dispatch(open_popup_feedback());
  }
  getListFollowers(user){
    var that = this;
    let {dispatch} = this.props;
    if(!user) return;
    this.setState({loading: true});
     io.socket.post('/follow/get_followers',{userId: user.id}, function(resData, jwres){
        if(resData.ok){
          dispatch(get_followers(resData.ok));
          return that.setState({...that.state,loading: false});
        }else{
          dispatch(get_followers([]));
          return that.setState({...that.state,loading: false});
        }
      })
  }
  showPopupUser(){
    var {dispatch} = this.props;
    dispatch(open_popup_user());
  }
  renderAdmin = ()=>{
    let countFeedbackUnread = 0;
    if(this.props.user.isAdmin === true){
      return(
      <div>
        <li>
          <i className="icon ion-ios-paper"></i>
          <div>
            <Link to='/newsfeed/feedback'>Feedback Management</Link>
          </div>
        </li>
        <li>
          <i className="icon ion-planet"></i>
          <div>
            <Link to='/newsfeed/listuser'>User Management</Link>
          </div>
        </li>
      </div>
      )
    }else{
      return null;
    }
  }
  render(){
    let renderMsgUnreadF = ()=>{
      let count = 0;
      if(this.state.listInbox.length>0){
        this.state.listInbox.map( (value, key)=>{
          if(value.messageIdLatest && value.messageIdLatest.receive_userId === this.props.user.id && value.messageIdLatest.isRead === false){
            count ++;
          }
        })
      }
      if(count >0){ document.title = "Social Pets ("+count+" message)";
        return (<div className="pull-right"><div className="chat-alert-menu">{count}</div></div>)
      }else{ document.title = "Social Pets";
        return (<div className="pull-right"><i className="icon ion-checkmark-round"></i></div>)
      }
    }
    let renderMsgUnread = renderMsgUnreadF();
    let renderNotifyUnreadF = ()=>{
      let count = 0;
      if(this.state.listNotify.length>0){
        this.state.listNotify.map( (value, key)=>{
          if(value.isRead === false){
            count ++;
          }
        })
      }
      if(count >0){ document.title = "Social Pets ("+count+" notification)";
        return (<div className="pull-right"><div className="chat-alert-menu">{count}</div></div>)
      }else{ document.title = "Social Pets";
        return (<div className="pull-right"><i className="icon ion-checkmark-round"></i></div>)
      }
    }
    let renderNotifyUnread = renderNotifyUnreadF();
    let cover = this.state.user.cover;
    let renderListFollower = this.props.listFollowers?this.props.listFollowers.length:0;
    let styleProfile = {
      cursor: 'pointer',
      backgroundImage: 'linear-gradient(rgba(94, 174, 206, 0), rgba(125, 164, 193, 0.8)),url(' + cover + ')',
      backgroundSize : 'cover',

    }
    let renderAdmin = this.renderAdmin();
    return(
      <div>
      <PopupUser />
      <PopupFeedback />
        <div className="profile-card" style={styleProfile} >
          <Link to="/profile/timeline"><img src={this.state.user.picture} alt="user" className="profile-photo" /></Link>
          <h5>
            <Link to="/profile/timeline" className="text-white">{this.state.user.name}</Link>
          </h5>
          <a href="#" className="text-white">
            <Link className="text-white" to="/profile/followers"><i className="ion ion-android-person-add">{"  "+renderListFollower+" follower"}</i></Link>
          </a>
        </div>

        <ul className="nav-news-feed">
          <li>
            <i className="icon ion-android-notifications"></i>
            <div>
              <Link to='/newsfeed/notification'>Notification</Link>
              {renderNotifyUnread}
            </div>
          </li>
          <li>
            <i className="icon ion-chatboxes"></i>
            <div>
              <Link to='/newsfeed/chatroom'>ChatRoom</Link>
              {renderMsgUnread}
            </div>
          </li>
          <li>
            <i className="icon ion-ios-people"></i>
            <div>
              <Link to='/profile/followers'>Followers</Link>
            </div>
          </li>
          <li>
            <i className="icon ion-ios-people-outline"></i>
            <div>
              <Link to='/profile/followings'>Followings</Link>
            </div>
          </li>
          <li>
            <i className="icon ion-navigate"></i>
            <div>
              <a style={{cursor:"pointer"}} onClick={this.showPopupFeedback.bind(this)}>Feedback</a>
            </div>
          </li>

          {renderAdmin}

        </ul>
      </div>
    )
  }
}
module.exports = connect( function(state){
    return {user: state.userReducer.user, listInbox:state.chatReducer.listInbox, listFollowers: state.followReducer.listFollowers, listNotify: state.userReducer.listNotify};
})(MenuVertical);
