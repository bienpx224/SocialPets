import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import IndexContent from 'IndexContent';
import Login from 'Login';
import PopupChangePicture from 'PopupChangePicture';
import {set_user, open_popup_user,get_post_err, open_popup_change_picture,login_error,login_success} from 'userAction';
import {get_alldata_user} from 'apiUser';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';

class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      isLogin : false,
      type: "",

    }
  }
  componentDidMount(){
    var {dispatch} = this.props;
    let that = this;
    if(localStorage.email){
    }else{
    io.socket.post('/user/getUser', {email:localStorage.email}, function(resData, jwres){

      if(resData.error){
        dispatch(login_error());
      }
      if(resData.notFound){
        dispatch(login_error());
      }else{
        dispatch(login_success(resData.user));
      }
    });
  }
  changePicture(){
    var {dispatch} = this.props;
    this.setState({type:"picture"})
    dispatch(open_popup_change_picture());
  }
  changeCover(){
    var {dispatch} = this.props;
    this.setState({type:"cover"})
    dispatch(open_popup_change_picture());
  }
  componentWillReceiveProps(nextProps){
    this.setState({...this.state,isLogin: nextProps.isLogin});
  }
  render(){
    if(!this.props.isLogin){
      return ( <Login />)
    }else{
      return(
             <div className="container" style={{marginTop:"-24px"}}>

             <PopupChangePicture type={""+this.state.type}/>

                <div className="timeline">
                  {/* Avatar and COver picture */}
                  <div className="timeline-cover" style={{backgroundImage:"url("+this.props.user.cover+")", backgroundPosition:"center", backgroundSize:"cover"}}>
                      <div className="change-cover hidden-sm hidden-xs" onClick={this.changeCover.bind(this)}>
                          <span className="ion-camera pull-left" style={{fontSize:"30px"}}></span>Change cover

                      </div>
                      <div className="timeline-nav-bar hidden-sm hidden-xs">
                        <div className="row">
                          <div className="col-md-3">

                            <div className="profile-info">
                              <img src={this.props.user.picture} alt="" className="img-responsive profile-photo"
                              style={{cursor:"pointer"}} onClick={this.changePicture.bind(this)} />

                              <h3>{this.props.user.name}</h3>
                              <p className="text-muted">{this.props.user.email}</p>
                              <p className="text-muted">{this.props.user.day_date+","+this.props.user.month_date+","+this.props.user.year_date}</p>
                            </div>
                          </div>
                          <div className="col-md-9">
                            <ul className="list-inline profile-menu">
                              <li><Link to='/profile/timeline'>Timeline</Link></li>
                              <li><Link to='/profile/information'>Information</Link></li>
                              <li><Link to='/profile/followers'>Follwers</Link></li>
                              <li><Link to='/profile/followings'>Follwings</Link></li>
                            </ul>
                            <ul className="follow-me list-inline">
                              <li>Yours point : <span  className="ion-star pull-left"></span>{this.props.user.point}</li>

                            </ul>
                          </div>
                        </div>
                      </div>{/* Timeline Menu htmlFor Large Screens End */}

                      {/*Timeline Menu htmlFor Small Screens */}
                      <div className="navbar-mobile hidden-lg hidden-md">
                        <div className="profile-info">
                          <img src={this.props.user.picture} alt="" className="img-responsive profile-photo" />
                          <h4>{this.props.user.name}</h4>
                          <p className="text-muted">Creative Director</p>
                        </div>
                        <div className="mobile-menu">
                          <ul className="list-inline">
                            <li><Link to='/profile/timeline'>Timeline</Link></li>
                            <li><Link to='/profile/information'>Information</Link></li>
                            <li><Link to='/profile/followers'>Follwers</Link></li>
                            <li><Link to='/profile/followings'>Follwers</Link></li>
                          </ul>
                          <ul className="follow-me list-inline">
                            <li><span  className="ion-star pull-left"></span>{this.props.user.point}</li>
                          </ul>
                        </div>
                       </div>
                  </div>
                  {/* End Avatar and Cover picture */}

                  <IndexContent />

                </div>
             </div>
          )
      }
  }
}
module.exports = (connect( function(state){
  return {user: state.userReducer.user, isLogin: state.userReducer.isLogin};
})(Profile));
