import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import IndexContent from 'IndexContent';
import Login from 'Login';
import IndexUser from 'IndexUser';
import Notfound from 'Notfound';
import {get_person,set_user, open_popup_user,get_post_err, open_popup_change_picture,login_error,login_success} from 'userAction';
import {get_alldata_user} from 'apiUser';
import {BrowserRouter as Router,Route,Switch,hashHistory,Redirect,NavLink,withRouter,Link} from 'react-router-dom';

class User extends React.Component{
  constructor(props){console.log("construc user");
    super(props);
    this.state={
      isLogin: false,
      isNotfound: true,
    }
  }
  checkLogin(){
    let {dispatch} = this.props;
    if(localStorage.email){
      console.log("localStorage", localStorage.email);
    }else{ console.log("khong ton tai email in local")}
    io.socket.post('/user/getUser', {email:localStorage.email}, function(resData, jwres){
      console.log("getUser: ", resData);
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
  componentDidMount(){
    let {email} = this.props.match.params;
    this.checkLogin();
    this.getPerson(email);
  }
  getPerson(email){
    let {dispatch} = this.props;
    io.socket.post('/user/getUser', {email}, (resData, jwres)=>{
      console.log("getUser: ", resData);
      if(resData.error){
      }
      if(resData.notFound){
      }else{
        this.setState({isNotfound:false});
        dispatch(get_person(resData.user));
      }
    });
  }
  componentWillReceiveProps(nextProps){console.log("nextProps User: ", nextProps);
    if(nextProps.match.params.email !== this.props.match.params.email){
      this.getPerson(nextProps.match.params.email);
    }
    if(nextProps.isLogin){
      this.setState({...this.state,isLogin: nextProps.isLogin});
    }
    if(nextProps.person){
      this.setState({...this.state,isLogin: nextProps.person});
    }
  }
  render(){
    if(this.props.isLogin === false){
      return ( <Login />)
    }if(this.state.isNotfound === true){
      return ( <Notfound /> )
    }
    else{
      return(
             <div className="container" style={{marginTop:"-24px"}}>

             <div className="timeline">
               {/* Avatar and COver picture */}
               <div className="timeline-cover" style={{backgroundImage:"url("+this.props.person.cover+")", backgroundPosition:"center", backgroundSize:"cover"}}>
                   <div className="change-cover hidden-sm hidden-xs">
                       <span className="ion-camera pull-left" style={{fontSize:"30px"}}></span>Change cover

                   </div>
                   <div className="timeline-nav-bar hidden-sm hidden-xs">
                     <div className="row">
                       <div className="col-md-3">

                         <div className="profile-info">
                           <img src={this.props.person.picture} alt="" className="img-responsive profile-photo"
                           style={{cursor:"pointer"}} />

                           <h3>{this.props.person.name}</h3>
                           <p className="text-muted">{this.props.person.email}</p>
                           <p className="text-muted">{this.props.person.day_date+","+this.props.person.month_date+","+this.props.person.year_date}</p>
                         </div>
                       </div>
                       <div className="col-md-9">
                         <ul className="list-inline profile-menu">
                           <li><Link to={'/user/'+this.props.person.email+'/timeline'}>Timeline</Link></li>
                           <li><Link to={'/user/'+this.props.person.email+'/information'}>Information</Link></li>
                           <li><Link to={'/user/'+this.props.person.email+'/followers'}>Follwers</Link></li>
                           <li><Link to={'/user/'+this.props.person.email+'/followings'}>Follwings</Link></li>
                         </ul>
                         <ul className="follow-me list-inline">
                           <li>Yours point : <span  className="ion-star pull-left"></span>{this.props.person.point}</li>
                           <li><button className="btn-primary"><span className="ion-person-add pull-left"></span>Follow </button></li>
                         </ul>
                       </div>
                     </div>
                   </div>{/* Timeline Menu htmlFor Large Screens End */}

                   {/*Timeline Menu htmlFor Small Screens */}
                   <div className="navbar-mobile hidden-lg hidden-md">
                     <div className="profile-info">
                       <img src={this.props.person.picture} alt="" className="img-responsive profile-photo" />
                       <h4>{this.props.person.name}</h4>
                       <p className="text-muted">Creative Director</p>
                     </div>
                     <div className="mobile-menu">
                       <ul className="list-inline">
                         <li><Link to={'/user/'+this.props.person.email+'/timeline'}>Timeline</Link></li>
                         <li><Link to={'/user/'+this.props.person.email+'/information'}>Information</Link></li>
                         <li><Link to={'/user/'+this.props.person.email+'/followers'}>Follwers</Link></li>
                         <li><Link to={'/user/'+this.props.person.email+'/followings'}>Follwers</Link></li>
                       </ul>
                       <ul className="follow-me list-inline">
                         <li><span  className="ion-star pull-left"></span>{this.props.person.point}</li>
                       </ul>
                     </div>
                    </div>
               </div>
               {/* End Avatar and Cover picture */}

               <IndexUser />

             </div>
             </div>
          )
      }
  }
}
module.exports = (connect( function(state){
  return {person: state.userReducer.person, isLogin: state.userReducer.isLogin, user:state.userReducer.user};
})(User));
