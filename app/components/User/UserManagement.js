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
        dispatch(get_listalluser(resData.listAllUser));
    })

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
return {user: state.userReducer.user, listAllUser: state.userReducer.listAllUser};
})(UserManagement);
