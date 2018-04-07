function get_followers(followers) {
  return {type:"GET_FOLLOWERS", followers: followers}
}
function get_followings(followings) {
  return {type:"GET_FOLLOWINGS", followings: followings}
}
function get_recommend_rank(ListRecommendRank){
  return {type:"GET_RECOMMEND_RANK", ListRecommendRank: ListRecommendRank}
}
function get_recommend_common(ListRecommendCommon){
  return {type:"GET_RECOMMEND_COMMON", ListRecommendCommon: ListRecommendCommon}
}
module.exports = {get_followers,get_followings,get_recommend_common,get_recommend_rank};
