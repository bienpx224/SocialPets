var data = {
    err: null,
    postsNewsfeed: []
};

var postReducer = (state = data, action)=>{
  switch(action.type){
    case "GET_POST_ERR":
      return {...state, err: action.err};
    case "GET_POST_NEWSFEED":
      return {...state, postsNewsfeed: action.posts}
    case "ADD_NEW_POST":
      return {...state, postsNewsfeed: [action.post,...state.postsNewsfeed]}
    default: return state;
  }
}

module.exports = postReducer;

