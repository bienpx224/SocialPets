function get_followers(followers) {
  return {type:"GET_FOLLOWERS", followers: followers}
}
function get_followings(followings) {
  return {type:"GET_FOLLOWINGS", followers: followings}
}
module.exports = {get_followers,get_followings};