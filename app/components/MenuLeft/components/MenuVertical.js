 import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user, open_popup_user} from 'userAction';
import PopupUser from 'PopupUser';
import {Link} from 'react-router-dom';
import {get_list_inbox} from 'chatAction';
import {get_followers} from 'followAction';

class MenuVertical extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      listInbox : [],
      user : false
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.listInbox){
      this.state.listInbox = nextProps.listInbox;
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
        io.socket.post('/inbox/getListInbox',{userId},(resData, jwres)=>{
          if(resData.err){
            alert("lỗi trong MenuVertical getListInbox");
          }
          if(resData.listInbox){
            dispatch(get_list_inbox(resData.listInbox));
          }
        })

        this.getListFollowers(this.props.user);
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
    let cover = this.state.user.cover;
    let renderListFollower = this.props.listFollowers?this.props.listFollowers.length:0;
    let styleProfile = {
      cursor: 'pointer',
      backgroundImage: 'linear-gradient(rgba(94, 174, 206, 0), rgba(125, 164, 193, 0.8)),url(' + cover + ')',
      backgroundSize : 'cover',

    }
    return(
      <div>
      <PopupUser />
        <div className="profile-card" style={styleProfile} onClick={this.showPopupUser.bind(this)}>
          <img src={this.state.user.picture} alt="user" className="profile-photo" />
          <h5>
            <Link to="/profile/timeline" className="text-white">{this.state.user.name}</Link>
          </h5>
          <a href="#" className="text-white">
            <i className="ion ion-android-person-add">{"  "+renderListFollower+" follower"}</i>
          </a>
        </div>

        <ul className="nav-news-feed">
          <li>
            <i className="icon ion-ios-paper"></i>
            <div>
              <Link to='/newsfeed'>Newsfeed</Link>
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
            <i className="icon ion-images"></i>
            <div>
              <Link to='/profile'>Profile</Link>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
module.exports = connect( function(state){
    return {user: state.userReducer.user, listInbox:state.chatReducer.listInbox, listFollowers: state.followReducer.listFollowers};
})(MenuVertical);
