import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Follower from 'Follower';
import {get_followers} from 'followAction';
import ReactPlaceholder from 'react-placeholder';
import ListRecommendRank from 'ListRecommendRank';
import ListRecommendCommon from 'ListRecommendCommon';

class IndexListRecommend extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="col-md-2 static">
        <ListRecommendRank />
        <hr className="hr-style" style={{width: "222px"}} />
        <ListRecommendCommon />
      </div>
    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user};
})(IndexListRecommend);
