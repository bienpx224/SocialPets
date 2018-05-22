var data = {
  listFollowers: [],
  listFollowings: [],
  ListRecommendRank : [],
  ListRecommendCommon : [],
  listSearch: [],
};

var followReducer = (state = data, action)=>{
  switch(action.type){
    case "GET_FOLLOWERS":
      return {...state, listFollowers: action.followers};
    case "GET_FOLLOWINGS":
      return {...state, listFollowings: action.followings};
    case "GET_RECOMMEND_COMMON":
      return {...state, ListRecommendCommon: action.ListRecommendCommon};
    case "GET_RECOMMEND_RANK":
      return {...state, ListRecommendRank: action.ListRecommendRank};
    default: return state;
  }
}

module.exports = followReducer;
