import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Follower from 'Follower';
import {get_followers} from 'followAction';
import ReactPlaceholder from 'react-placeholder';
import RecommendFollow from 'RecommendFollow';
import {get_recommend_common} from 'followAction';

class ListRecommendCommon extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      ListRecommendCommon: [],
    };
    this.getListRecommendCommon = this.getListRecommendCommon.bind(this);
  }
  componentDidMount(){
    this.getListRecommendCommon(this.props.user);
  }

  componentWillReceiveProps(nextProps){
    this.setState({...this.state, ListRecommendCommon : nextProps.ListRecommendCommon});
  }

  getListRecommendCommon(user){
    let {dispatch} = this.props;
    var that = this;
    if(!user) return that.setState({...that.state,loading: true});
    io.socket.post('/follow/recommend_common',{userId: user.id}, function(resData, jwres){
        if(resData.ok){
          dispatch(get_recommend_common(resData.ok));
          return that.setState({...that.state,loading: false});
        }
    })
  }
  render(){
    let that = this;
    if (this.state.loading) return(

        <div className="suggestions" id="sticky-sidebar">
          <h4 className="grey">Having in common</h4>
           <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
            <h3></h3>
          </ReactPlaceholder>
        </div>

      );
    else if (this.state.ListRecommendCommon.length === 0)
    return (

        <div className="suggestions" id="sticky-sidebar">
          <h4 className="grey">Having in common</h4>
          <h4> No suggestions </h4>
        </div>

    );
    else return(

        <div className="suggestions" id="sticky-sidebar">
          <h4 className="grey">Having in common</h4>
          {this.state.ListRecommendCommon.map( (user, i)=>{
             return <RecommendFollow key={i} followed={user} type="" getNewList = {that.getListRecommendCommon} />
           })
          }
        </div>

    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user, ListRecommendCommon: state.followReducer.ListRecommendCommon};
})(ListRecommendCommon);
