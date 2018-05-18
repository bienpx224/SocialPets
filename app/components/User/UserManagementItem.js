import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {get_listalluser} from 'userAction';

class UserManagementItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    }
  }
  handleClickName(){
    let id = this.props.data.id;
    let {dispatch} = this.props;
    if(this.props.data.isActive === true){
      io.socket.post('/user/blockUserById',{id},(resData, jwres)=>{
        if(resData.listAllUser){
          dispatch(get_listalluser(resData.listAllUser));
        }else{
          console.log("ERROR GET LIST listAllUser: ",resData.err);
        }
      })
    }else{
      io.socket.post('/user/activeUserById',{id},(resData, jwres)=>{
        if(resData.listAllUser){
          dispatch(get_listalluser(resData.listAllUser));
        }else{
          console.log("ERROR GET LIST listAllUser: ",resData.err);
        }
      })
    }
  }
  handleSetAdmin(){
    let id = this.props.data.id;
    let {dispatch} = this.props;
    if(this.props.data.isAdmin === true){
      io.socket.post('/user/unsetAdminById',{id},(resData, jwres)=>{
        if(resData.listAllUser){
          dispatch(get_listalluser(resData.listAllUser));
        }else{
          console.log("ERROR GET LIST listAllUser: ",resData.err);
        }
      })
    }else{
      io.socket.post('/user/setAdminById',{id},(resData, jwres)=>{
        if(resData.listAllUser){
          dispatch(get_listalluser(resData.listAllUser));
        }else{
          console.log("ERROR GET LIST listAllUser: ",resData.err);
        }
      })
    }
  }
  render(){
    let renderActive = this.props.data.isActive === true?"info":"danger";
    let renderName = this.props.data.isAdmin === true?"#ff3d3d":"black";
    let renderImg = this.props.data.picture?<a target="_blank" href={this.props.data.picture}><img className="profile-photo" src={this.props.data.picture} /></a>:null;
    return (
      <tr className={renderActive} style={{color:renderName}} onDoubleClick={this.handleSetAdmin.bind(this)}>
        <th scope="row"  title="Click change active user" onClick={this.handleClickName.bind(this)}>{this.props.data.name}</th>
        <td><Link to={"/user/"+this.props.data.email}>{this.props.data.email}</Link></td>
        <td title="Show image">{renderImg}</td>
        <td>{this.props.data.age_range}</td>
        <td>{this.props.data.address}</td>
      </tr>
    )
  }
}

module.exports = connect(function(state){
return {};
})(UserManagementItem);
