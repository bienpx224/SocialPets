function get_post_err(err){
  return{
    type:"GET_POST_ERR", err
  }
}
function get_postNewsfeed(posts){
  return{
    type:"GET_POST_NEWSFEED", posts
  }
}
function add_new_post(post){
  return{
    type:"ADD_NEW_POST", post
  }
}
function add_more_post(post){
  return{
    type:"ADD_MORE_POST", post
  }
}
function add_more_my_post(post){
  return{
    type:"ADD_MORE_MY_POST", post
  }
}
function list_my_post(posts){
  return {
    type: "LIST_MY_POST", posts
  }
}
function get_top_image(topP){
  return{type:"GET_TOP_IMAGE", topP}
}
module.exports = {get_top_image,get_post_err, get_postNewsfeed, add_new_post,add_more_post,list_my_post,add_more_my_post};
