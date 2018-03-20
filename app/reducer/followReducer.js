var data = {
  followers: [],
  followings: []
};

var followReducer = (state = data, action)=>{
  switch(action.type){
    case "GET_FOLLOWERS":
      return {...state, followers: action.followers};
    case "GET_FOLLOWINGS":
      return {...state, followings: action.followings};

    default: return state;
  }
}

module.exports = followReducer;