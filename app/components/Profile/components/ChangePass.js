import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import validateInfoUser from 'validateInfoUser';
import {set_user} from 'userAction';

class ChangePass extends React.Component{
  constructor(props){
    super(props);
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }
  handleUpdate(event){
    let {dispatch} = this.props;
    let oldP = this.refs.oldP.value;
    let newP = this.refs.newP.value;
    event.preventDefault();
      io.socket.post('/user/changePassword',{newP,oldP, id:this.props.user.id}, (resData, jwres)=>{
          if(resData.err){
            this.msg.show('ERROR: '+resData.err, {
              type: 'error',
              icon: <img src="/images/error.png" />
            })
          }else{
            this.refs.newP.value = "";
            this.refs.oldP.value = "";
            this.msg.show('SUCCESS: You updated success', {
                  type: 'success',
                  icon: <img src="/images/success.png" />
            })
          }
      })


  }
  render(){
    let renderBtnSave = this.props.type==="person"?null:<button className="btn btn-primary" onClick={this.handleUpdate.bind(this)}>Save Changes</button>;
    return(
                  <div className="col-md-7">
                  <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                      <div className="edit-profile-container">
                        <div className="block-title">
                          <h4 className="grey"><i className="icon ion-android-checkmark-circle"></i>Change Password</h4>
                          <div className="line"></div>
                        </div>
                        <div className="edit-block">
                          <form name="basic-info" id="basic-info" className="form-inline">
                            <div className="row">
                              <div className="form-group col-xs-6">
                                <label htmlFor="firstname">Old password</label>
                                <input className="form-control input-group-lg" type="password" ref="oldP" title="Enter old pass" placeholder="Enter old pass" />
                              </div>
                              <div className="form-group col-xs-6">
                                <label htmlFor="lastname" className="">New password</label>
                                <input className="form-control input-group-lg" type="password" ref="newP" title="Enter new pass" placeholder="Enter new pass" />
                              </div>
                            </div>
                            {renderBtnSave}
                          </form>
                        </div>
                      </div>
                </div>
    )
  }
}
module.exports = (connect( function(state){
  return {user: state.userReducer.user};
})(ChangePass));
