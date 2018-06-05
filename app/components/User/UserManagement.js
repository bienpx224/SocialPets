import React from 'react';
import {connect} from 'react-redux';
import UserManagementItem from 'UserManagementItem';
import {get_listalluser} from 'userAction';

class UserManagement extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listAllUser: [],
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.listAllUser){
      this.setState({listAllUser: nextProps.listAllUser})
    }
  }
  componentDidMount(){
    let userId = this.props.user.id;
    let {dispatch} = this.props;
    io.socket.post('/user/getAllUser',{},(resData, jwres)=>{
        this.setState({listAllUser: resData.listAllUser});
    })
  }
  search(event){
    if(event.keyCode === 13){
      let key = this.refs.search.value;
      let userId = this.props.user.id;
      if(key === ""){
        io.socket.post('/user/getAllUser',{},(resData, jwres)=>{
            this.setState({listAllUser: resData.listAllUser});
        })
      }else{
        io.socket.post('/user/searchUser',{userId,key, skip:0, limit:100 },(resData, jwres)=>{
            if(resData.listUser)
            this.setState({listAllUser: resData.listUser});
        })
      }
    }
  }
  render(){
    return (
      <div className="col-md-7 static fixed-content">
          <div className="row">
            <div className="border-chat">
              <h2 style={{textAlign:"center"}}>USER MANAGEMENT </h2>
            </div>
          </div>
        <div className="chat-room">
          <div className="row">
          <h4> Total: {this.state.listAllUser.length}</h4>
          <input onKeyUp={this.search.bind(this)} type="text" className="form-control" ref="search" />
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Image</th>
                <th scope="col">Options</th>
              </tr>
            </thead>
            <tbody>
            {this.state.listAllUser.map( (value, key)=>{
                return(
                    <UserManagementItem key={key} data={value} />
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
return {user: state.userReducer.user};
})(UserManagement);
