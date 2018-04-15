var data = {
    err: null,
    postsNewsfeed: [],
    listMyPost : []
};

var postReducer = (state = data, action)=>{
  switch(action.type){
    case "GET_POST_ERR":
      return {...state, err: action.err};
    case "GET_POST_NEWSFEED":
      return {...state, postsNewsfeed: action.posts}
    case "ADD_NEW_POST":
      return {...state, postsNewsfeed: [action.post,...state.postsNewsfeed], listMyPost:[action.post,...state.listMyPost] }
    case "ADD_MORE_POST":
      return {...state, postsNewsfeed: [...state.postsNewsfeed,action.post]}
    case "LIST_MY_POST":
      return {...state, listMyPost: action.posts};
    case "ADD_MORE_MY_POST":
      return {...state, listMyPost: [...state.listMyPost,action.post]}
    default: return state;
  }
}

module.exports = postReducer;
