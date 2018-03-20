/**
 *
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  get_user: function get_user(id){
    return new Promise( (resolve, reject)=>{
      User.findOne({id: id}, function(err, user){
        if(user){
          console.log("resolve user");
          resolve(user);
        }else{
          console.log("reject user");
          reject(err);
        }
      })
    })
  },
  get_follow: function get_follow(follow){
    return new Promise( (resolve, reject)=>{
        Follow.findOne({id: follow.id})
        .populateAll()
        .exec(function(err, result){
          if(err){ reject(err);}
          else{ resolve(result);}
        })
    })
  }

};

