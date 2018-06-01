import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import ChatList from 'ChatList';
import MenuVertical from 'MenuVertical';

class MenuLeft extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      style: "col-md-3 static scrollbar ",
    }
  }
  componentDidMount(){
    window.addEventListener('onScroll', this.handleScroll());
  }
  handleScroll(){
    let p = document.documentElement.scrollTop;
  }
  render(){
    return(
      <div   className="fixed-menu col-md-3 static scrollbar " id="style-11" >
        <MenuVertical />
        <ChatList />
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(MenuLeft);
