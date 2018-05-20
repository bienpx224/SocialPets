import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Follower from 'Follower';
import {get_followers} from 'followAction';
import ReactPlaceholder from 'react-placeholder';

class ListFollowers extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      listFollowers: []
    }
  }
  componentDidMount(){
    if(this.props.type==="person"){
      this.getListFollowers(this.props.person);
    }else{
      this.getListFollowers(this.props.user);
    }
  }

  componentWillReceiveProps(nextProps) {
      this.setState({...this.state, listFollowers : nextProps.listFollowers});
  }
  getListFollowers(user){
    var that = this;
    let {dispatch} = this.props;
    if(!user) return;
    this.setState({loading: true});
     io.socket.post('/follow/get_followers',{userId: user.id}, function(resData, jwres){
        if(resData.ok){
          dispatch(get_followers(resData.ok));
          return that.setState({...that.state,loading: false});
        }else{
          dispatch(get_followers([]));
          return that.setState({...that.state,loading: false});
        }
      })
  }
  render(){
    if (this.state.loading) return(
      <div className="friend-list">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
           <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
            <h3></h3>
          </ReactPlaceholder>
          </div>
        </div>
      </div>
      );
    else if (this.state.listFollowers.length === 0)
    return (
      <div className="friend-list">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
           <h3>Nobody follow!!!</h3>
          </div>
        </div>
      </div>
    );
    else return(
      <div className="friend-list">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
          <h3>List Follower</h3>
           {this.state.listFollowers.map( (follower, i)=>{
              return <Follower key={i} userId={follower.userId} picture={follower.userId.picture} cover={follower.userId.cover} name={follower.userId.name} email={follower.userId.email} />
           })
          }
          </div>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user, listFollowers: state.followReducer.listFollowers, person:state.userReducer.person};
})(ListFollowers);
