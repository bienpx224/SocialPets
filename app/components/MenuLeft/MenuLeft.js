import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import {set_user} from 'userAction';
import ChatList from 'ChatList';
import MenuVertical from 'MenuVertical';
import {get_post_err, get_postNewsfeed, get_top_image} from 'postAction';

class MenuLeft extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      style: "col-md-3 static scrollbar ",
    }
  }
  componentDidMount(){
    this.getListTopImage();
  }
  getListTopImage(){
    let {dispatch} = this.props;
    let weekAgo = +new Date()-604800016;
    weekAgo = ""+weekAgo;
    io.socket.post('/post/topImageOfWeek',{weekAgo},(resData, jwres)=>{

      if(resData.topP){
        dispatch(get_top_image(resData.topP));
      }else console.log(" co loi get ListTopImage");
    })
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
