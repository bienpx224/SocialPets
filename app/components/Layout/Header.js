import React from 'react';
import {connect} from 'react-redux';
import Menu from 'Menu';
import Search from 'Search';
import {NavLink,withRouter,Link} from 'react-router-dom';
import AlertContainer from 'react-alert';
import {add_notify,set_user,login_error,login_success} from 'userAction';
import {get_post_err, get_postNewsfeed} from 'postAction';
import {get_list_inbox, get_list_msg, get_inbox} from 'chatAction';
import Notify from 'Notify';

class Header extends React.Component{
  constructor(props){
    super(props);
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  };

  componentWillReceiveProps(nextProps){

  }

  componentDidMount(){


    io.socket.on('notify', (data) => {
      let userId = data.data.userId;
      let {dispatch} = this.props;
      if((userId.id === this.props.user.id)&&(userId.id !== data.data.related_userId.id)){
        dispatch(add_notify(data.data));
        this.msg.show(<Notify type="notify" data={data.data} />)
        document.getElementById('sound').play();
        if(!document.hasFocus()){
        }
      }
    });

    io.socket.on('message', (data) => {
      let {dispatch} = this.props;
      let userId = this.props.user.id;
      let receiveUser = data.userId;
      let listInbox = data.data;
      if(receiveUser === userId){
        document.getElementById('message').play();

        dispatch(get_list_inbox(listInbox));
        if(listInbox.length>0){
          listInbox.map( (value, key)=>{
            if(this.props.inboxData && value.id === this.props.inboxData.id){
              dispatch(get_inbox(value));
              dispatch(get_list_msg(value.listMsg));
            }
          })
        }
        // if(!document.hasFocus()){
            this.msg.show(<Notify userSendName = {data.userSendName} type = "message" />);
        // }
        document.title = data.userSendName + " đã nhắn tin cho bạn";
      }
    });
  }


  render(){
    return(
      <header id="header"  id="top">
        <nav className="navbar navbar-default navbar-fixed-top menu">
          <div className="container">
          <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <audio id='sound' preload='auto'>
            <source src='/sound/notify.mp3' type='audio/mpeg' />
            <embed hidden='true' loop='false' src='/sound/notify.mp3' />
          </audio>
          <audio id='message' preload='auto'>
            <source src='/sound/fbMsg.mp3' type='audio/mpeg' />
            <embed hidden='true' loop='false' src='/sound/fbMsg.mp3' />
          </audio>

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand"><Link to='/'><img src="/images/logo.png" alt="logo" /></Link></a>
            </div>


            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              <Menu />
              <Search />

            </div>
          </div>
        </nav>
      </header>
    )
  }
}

module.exports = withRouter(connect( function(state){
  return {user: state.userReducer.user, inboxData: state.chatReducer.inboxData};
})(Header));
