import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Follower from 'Follower';
import {get_followers} from 'followAction';
import ReactPlaceholder from 'react-placeholder';

class RecommendFollow extends React.Component{
  constructor(props){
    super(props); console.log("listFollower:constructor: props: ", props);
    this.state = {
      loading: false,
      ListFollowers: []
    }
  }
  componentDidMount(){
    this.getListFollowers(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    if (
      (!this.props.user && nextProps.user) ||
      this.props.user.id !== nextProps.user.id
    ) {
      this.getListFollowers(nextProps.user);
    }
  }
  getListFollowers(user){
    var that = this;
    if(!user) return;
    this.setState({loading: true});
     io.socket.post('/follow/get_followers',{userId: user.id}, function(resData, jwres){
        if(resData.ok){ console.log("ResData.ok: ",resData.ok);
          return that.setState({ListFollowers: resData.ok, loading: false});
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
    else if (this.state.ListFollowers.length === 0)
    return (
      <div className="friend-list">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
           <h3>Nobody follow you!!!</h3>
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
           {this.state.ListFollowers.map( (follower, i)=>{
              return <Follower key={i} picture={follower.userId.picture} cover={follower.userId.cover} name={follower.userId.name} email={follower.userId.email} />
           })
          }
          </div>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(RecommendFollow);
