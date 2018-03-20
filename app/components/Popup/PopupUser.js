import React from 'react';
import {connect} from 'react-redux';
import {Modal,Button} from 'react-bootstrap';
import {close_popup_user} from 'userAction';

class PopupUser extends React.Component{
  constructor(props){
    super(props);
  }
  close(){
    var {dispatch} = this.props;
    dispatch(close_popup_user());
  }
  render(){
    return(
      <div className="popup-form">
          <Modal bsSize="sm" show={this.props.showPopupUser} onHide={this.close}>
              <Modal.Header>
                  <Modal.Title> </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{overflow:"auto",height:"100%"}}>

                <div>hahah</div>

              </Modal.Body>
              <Modal.Footer>
                <input type="button" style={{marginLeft:"10px",height:"30px"}} className="btn btn-success" defaultValue="Chấp nhận" />
                <Button onClick={this.close.bind(this)}>Thoát</Button>
              </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

module.exports = connect(function(state){
    return{showPopupUser: state.userReducer.showPopupUser, user: state.userReducer.user};
})(PopupUser);
