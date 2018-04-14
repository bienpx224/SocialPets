import React from 'react';
import {connect} from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import validateInfoUser from 'validateInfoUser';
import AlertContainer from 'react-alert';
import {get_pet,open_popup_add_pet} from 'userAction';
import Pet from 'Pet';
import PopupAddPet from 'PopupAddPet';

class ListPet extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      listPet : [],
      typePopup: "add",
    }
    // this.getHistoryUser = this.getHistoryUser.bind(this);
  }
  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'light',
    time: 3000,
    transition: 'scale'
  }
  componentDidMount(){
    let userId = this.props.user.id;
    this.getListPet(userId);
  }
  getListPet(userId){
    let that = this;
    let {dispatch} = this.props;
    this.setState({loading: true});
    io.socket.post('/pet/getListPet',{userId},function(resData, jwres){
      if(resData.err){
        that.msg.show('ERROR: '+resData.err, {
                          type: 'error',
                          icon: <img src="/images/error.png" />
        })
        var listPet = [];
        dispatch(list_history(listPet));
        return that.setState({...that.state,loading: false});
      }
      if(resData.listPet){
        var listPet = resData.listPet;
        dispatch(get_pet(listPet));
        return that.setState({...that.state,loading: false});
      }
    })
  }
  showPopupAddPet(){
    let {dispatch} = this.props;
    dispatch(open_popup_add_pet("add"));
  }
  componentWillReceiveProps(nextProps){
    this.setState({...this.state, listPet : nextProps.listPet});
  }
  render(){
    let that = this;
    if(this.state.loading) return(
      <div className="col-md-7 static edit-profile-container">
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="block-title">
          <h4 className="grey">
            <i className="icon ion-android-checkmark-circle"></i>
            Pets of {that.props.user.name}
          </h4>
          <hr />
          <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
            <h3></h3>
          </ReactPlaceholder>
        </div>
        <div className="history-temp"></div>
      </div>

    )
    else if(this.state.listPet.length === 0)
      return(
        <div className="col-md-7 static edit-profile-container">
        <PopupAddPet type={that.state.typePopup} />
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
          <div className="block-title">
            <h4 className="grey">
              <i className="icon ion-android-checkmark-circle"></i>
              Pets of {that.props.user.name}
              <button onClick={this.showPopupAddPet.bind(this)} type="button" className="btn btn-success pull-right">
                <i className="ion-social-octocat" style={{color:"white"}}></i>Add pet
              </button>
            </h4>
            <hr />
            <h3>Nothing to show</h3>
          </div>
          <div className="history-temp"></div>
        </div>
    )
    else
    return(
      <div className="col-md-7 static edit-profile-container">
      <PopupAddPet />
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <div className="block-title">
          <h4 className="grey">
            <i className="icon ion-android-checkmark-circle"></i>
            Pets of {that.props.user.name}
            <button onClick={this.showPopupAddPet.bind(this)} type="button" className="btn btn-success pull-right">
              <i className="ion-social-octocat" style={{color:"white"}}></i>Add pet
            </button>
          </h4>
          <hr />
        </div>
        {this.state.listPet.map(function(i,index){
          return (
            <div key={index}>
              <Pet key={index} data={i} />
            </div>
          )
        })
        }
        <div className="history-temp"></div>
      </div>
    )
  }
}
module.exports = (connect( function(state){
  return {user: state.userReducer.user, listPet:state.userReducer.listPet};
})(ListPet));
