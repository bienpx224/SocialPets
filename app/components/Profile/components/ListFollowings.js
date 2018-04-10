import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Following from 'Following';
import {get_followings} from 'followAction';
import ReactPlaceholder from 'react-placeholder';

class ListFollowings extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      listFollowings: []
    }
  }
  componentDidMount(){
    this.getlistFollowings(this.props.user);
  }
  componentWillUnmount(){
    let {dispatch} = this.props;
    dispatch(get_followings([]));
  }
  componentWillReceiveProps(nextProps) {
      this.setState({...this.state, listFollowings : nextProps.listFollowings});
  }
  getlistFollowings(user){
    var that = this;
    let {dispatch} = this.props;
    if(!user) return;
    this.setState({loading: true});
     io.socket.post('/follow/get_followings',{userId: user.id}, function(resData, jwres){
        if(resData.ok){
          dispatch(get_followings(resData.ok));
          return that.setState({...that.state,loading: false});
        }else{
          dispatch(get_followings([]));
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
    else if (this.state.listFollowings.length === 0)
    return (
      <div className="friend-list">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
           <h3>You have not followed anyone yet !!!</h3>
          </div>
        </div>
      </div>
    );
    else return(
      <div className="friend-list">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-8">
          <h3>List Following</h3>
           {this.state.listFollowings.map( (follower, i)=>{
              return <Following key={i} followed={follower.followed} />
           })
          }
          </div>
        </div>
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user, listFollowings: state.followReducer.listFollowings};
})(ListFollowings);
