import React from 'react';
import {connect} from 'react-redux';
import {Modal,Button} from 'react-bootstrap';
import {close_popup_add_pet, add_new_pet, change_loading} from 'userAction';
import AlertContainer from 'react-alert';
import validateInfoUser from 'validateInfoUser';

class PopupAddPet extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      image : null,
      nameImg: null,
    }
  }
  close(){
    var {dispatch} = this.props;
    dispatch(close_popup_add_pet());
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 2000,
    transition: 'scale'
  }
  handleAddPet(){
    let {dispatch} = this.props;
    dispatch(change_loading(true));
    let that = this;
    var nameImg = this.state.nameImg;
    var Pet = {
      description: this.refs.description.value,
      name: this.refs.name.value,
      type: this.refs.type.value,
      image: this.state.nameImg,
      userId: this.props.user.id,
      isActive: true
    };
    if(Pet.name.length === 0 || Pet.image === null || Pet.type.length === 0 ){
      this.msg.show('ERROR: Not enough information for pet !! ', {
                            type: 'error',
                            icon: <img src="/images/error.png" />
      })
        document.getElementById("btnAddPet").disabled = false;
        document.getElementById("btnCloseAdd").disabled = false;
    } else{
        var position = nameImg.lastIndexOf(".");
        if(position>0) nameImg = nameImg.substring(0,position);
        io.socket.post('/post/handleImg',{result:this.state.image,name:nameImg}, function(resData, jwres){
          if(!resData.err && resData.link){
              Pet.image = resData.link;
              io.socket.post('/pet/addPet', {userId: that.props.user.id,pet_data:Pet}, function(resData, jwres){
                dispatch(change_loading(false));
                if(resData.error){
                    var errors = resData.invalidAttributes;
                    validateInfoUser(errors, function(errContent){
                        if(errContent.length != 0){
                            errContent.map(function(i,index){
                                that.msg.show('ERROR: '+errContent[index], {
                                  type: 'error',
                                  icon: <img src="/images/error.png" />
                                })
                            })
                        }
                    })
                }
                if(resData.ok){
                  that.msg.show('WOW: Your pet is so cute <3', {
                                    type: 'success',
                                    icon: <img src="/images/success.png" />
                  })

                  dispatch(add_new_pet(resData.ok));

                  that.handleCloseImage();
                  that.refs.name.value = "";
                  that.refs.type.value = "";
                  that.refs.description.value = "";
                  that.close();
                }else{
                  that.msg.show('ERROR: Somethings are wrong !! ', {
                                    type: 'error',
                                    icon: <img src="/images/error.png" />
                  })
                }
              })
          }else{
            dispatch(change_loading(false));
            that.msg.show('ERROR: '+resData.err, {
                              type: 'error',
                              icon: <img src="/images/error.png" />
            })
          }
        })
    }
  }
  handleCloseImage(){
    this.state.nameImg = null;
    this.state.image = null;
    this.setState(this.state);
  }
  handleChangeImage(event){
    var that = this;
    var typeImage = ['image/gif', 'image/jpeg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/svg+xml'];
    if(event.target.files && event.target.files[0]){ var i = 0;
      console.log(event.target.files[0]);
      if(event.target.files[0].size<1048576){
        typeImage.forEach(function(item){
          if(item === event.target.files[0].type){
            let reader = new FileReader();
            var val = Math.floor(1000 + Math.random() * 9000);
            var nameImg =""+val+"_"+ event.target.files[0].name;
            reader.onload = (e)=>{
              that.setState({image: e.target.result, nameImg: nameImg});
            }
            reader.readAsDataURL(event.target.files[0]);
          }else{
            i++;
          }
        })
        if(i === typeImage.length){
            this.msg.show('ERROR: You can only select image file !! ', {
                              time: 5000,
                              theme: 'light',
                              type: 'error',
                              icon: <img src="/images/error.png" />
            })
        }
      }else{
        this.msg.show('ERROR: Your image is too large. It must < 10MB !! ', {
                          time: 5000,
                          theme: 'light',
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
      }
    }
  }
  render(){
    return(
      <div className="popup-form">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <Modal bsSize="sm" show={this.props.showPopupAddPet} onHide={this.close.bind(this)}>
              <Modal.Header>
                  <Modal.Title> ADD NEW PET </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{overflow:"auto",height:"100%"}}>
              <div className="container">
                <div className="col-md-12">
                  <div className="profile-info">
                    <ul className="publishing-tools list-inline" style={{paddingLeft:"30px"}}>
                      <i className="ion-images"><input style={{minHeight:"70px", minWidth:"80%"}} onChange={this.handleChangeImage.bind(this)} className="profile-photo img-responsive" type="file"/></i>
                      <li>
                        <img src={this.state.image} alt="no photo" style={{height:"100px", width:"100px"}} className="img-responsive profile-photo preview-image-post"/>
                      </li>
                    </ul>
                    <input ref="name" className="form-control input-group-lg" placeholder="Name of pet: ..." />
                    <input ref="type" className="form-control input-group-lg" placeholder="Type: dog, cat,..." />
                    <input ref="description" className="form-control input-group-lg" placeholder="Description: age, gender, info..." />
                    <p className="text-muted">{this.props.user.name}</p>
                  </div>
                </div>
              </div>
              </Modal.Body>
              <Modal.Footer>
                <input id="btnAddPet" onClick={this.handleAddPet.bind(this)} type="button" style={{marginLeft:"10px",height:"30px"}} className="btn btn-success" defaultValue="Chấp nhận" />
                <Button id="btnCloseAdd" onClick={this.close.bind(this)}>Thoát</Button>
              </Modal.Footer>
          </Modal>
      </div>
    )
  }
}

module.exports = connect(function(state){
    return{showPopupAddPet: state.userReducer.showPopupAddPet,user: state.userReducer.user, type: state.userReducer.popupPet};
})(PopupAddPet);
