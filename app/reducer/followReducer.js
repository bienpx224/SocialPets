var data = {
  followers: [],
  followings: [],
  ListRecommendRank : [],
  ListRecommendCommon : []
};

var followReducer = (state = data, action)=>{
  switch(action.type){
    case "GET_FOLLOWERS":
      return {...state, followers: action.followers};
    case "GET_FOLLOWINGS":
      return {...state, followings: action.followings};
    case "GET_RECOMMEND_COMMON":
      return {...state, ListRecommendCommon: action.ListRecommendCommon};
    case "GET_RECOMMEND_RANK":
      return {...state, ListRecommendRank: action.ListRecommendRank};
    default: return state;
  }
}

module.exports = followReducer;
