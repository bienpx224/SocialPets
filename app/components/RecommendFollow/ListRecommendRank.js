import React from 'react';
import {connect} from 'react-redux';
import AlertContainer from 'react-alert';
import Follower from 'Follower';
import {get_followers} from 'followAction';
import ReactPlaceholder from 'react-placeholder';
import RecommendFollow from 'RecommendFollow';
import {get_recommend_rank} from 'followAction';
import {Link} from 'react-router-dom';

class ListRecommendRank extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      ListRecommendRank: [],
    };
    this.getListRecommendRank = this.getListRecommendRank.bind(this);
  }
  componentDidMount(){
    this.getListRecommendRank(this.props.user);
  }

  componentWillReceiveProps(nextProps){
    this.setState({...this.state, ListRecommendRank : nextProps.ListRecommendRank});
  }
  getListRecommendRank(user){
    var that = this;
    let {dispatch} = this.props;
    if(!user) return that.setState({...that.state,loading: true});
     io.socket.post('/follow/recommend_rank',{userId: user.id, skip:0, limit:2}, function(resData, jwres){
        if(resData.ok){
          dispatch(get_recommend_rank(resData.ok));
          return that.setState({...that.state,loading: false});
        }
      })
  }
  render(){
    let that = this;
    if (this.state.loading) return(

        <div className="suggestions" id="sticky-sidebar">
          <h4 className="grey">Top rank people</h4>
           <ReactPlaceholder ready={false} type="media" rows={7} showLoadingAnimation={true}>
            <h3></h3>
          </ReactPlaceholder>
        </div>

      );
    else if (this.state.ListRecommendRank.length === 0)
    return (

        <div className="suggestions" id="sticky-sidebar">
          <h4 className="grey">Top rank people</h4>
          <h4> No suggestions </h4>
        </div>

    );
    else return(

        <div className="suggestions" id="sticky-sidebar">
          <Link to="/newsfeed/search/rank">
            <h4 title="show more" className="grey">Top rank people <i className="icon ion-more pull-right"></i></h4>
          </Link>
            {this.state.ListRecommendRank.map( (user, i)=>{
               return <RecommendFollow key={i} followed={user} type="" getNewList = {that.getListRecommendRank} />
             })
            }
        </div>

    )
  }
}
module.exports = connect( function(state){
  return {user: state.userReducer.user, ListRecommendRank: state.followReducer.ListRecommendRank};
})(ListRecommendRank);
