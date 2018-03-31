/**
 * FriendController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	follow: function(req,res){
    let {userId, followed} = req.body;
    Follow.findOne({userId, followed})
    .then( (follow)=>{
      if(follow){
        if(follow.isActive === true) return res.send({err: 'Something are wrong, you are following this user!!'});
        if(follow.isActive === false){
          Follow.update({id: follow.id},{isActive: true})
          .exec( (err, updated)=>{
            if(err){
              return res.send({err: err});
            }
            if(updated){
              return res.send({updated: updated});
            }
              return res.send({err: "Something wrong when update!!"});

          })
        }
      }else{
        Follow.create({userId, followed, isActive:true})
        .exec( (err, follow_success)=>{
          if(err){
            return res.send({err: "errror When create follow: "+err});
          }
          if(follow_success){
            return res.send({follow: follow_success});
          }
          return res.send({err: "follow_success not found!!"});
        })
      }

    })
    .catch( err => res.send({err: err}))
  },
  unfollow: function(req,res){
    let {userId, followed} = req.body;
    Follow.findOne({userId, followed})
    .then( (follow)=>{
      if(follow){
        if(follow.isActive === false) return res.send({err: 'Something are wrong, you are unfollowing this user!!'});
        if(follow.isActive === true){
          Follow.update({id: follow.id},{isActive: false})
          .exec( (err, updated)=>{
            if(err){
              return res.send({err: err});
            }
            if(updated){
              return res.send({updated: updated});
            }
              return res.send({err: "Something wrong when update!!"});

          })
        }
      }else{
         return res.send({err:"Da follow dau ma doi unfollow!!"});
      }

    })
    .catch( err => res.send({err: err}))
  },


  // get_followers: function(req,res){
  //   var userId = req.body.userId;
  //   User.find({id: userId})
  //   .populate('followers')
  //   .then( (user)=>{
  //     var ok_followers = user[0].followers.toObject(); if(typeof ok_followers ==='object'){ sails.log.info("Object")}
  //                                           if(typeof ok_followers ==='undefined'){ sails.log.info("undefined")}
  //             sails.log.info("data firsttttt: "); sails.log.info(typeof ok_followers[0]);
  //     var len = ok_followers.length;
  //     var i = 0;
  //     for(i=0; i < len; i++){
  //       // Get data user for userId....
  //       var p1 = UserService.get_user(ok_followers[i].userId);
  //       var p2 = UserService.get_user(ok_followers[i].followed);
  //       Promise.all([p1, p2])
  //       .then( (data)=>{
  //         // sails.log.info("data Promise all: ", data);
  //         // ok_followers[i].userId = data[0];
  //         // ok_followers[i].followed = data[1];
  //         sails.log.info("data okeeeeeeeeeeeee: "); sails.log.info(ok_followers);
  //         if(i == len-1 ){
  //         return res.send({user: user, followers: ok_followers});
  //         }
  //       })
  //       .catch( err => sails.log.info(err))

  //     }
  //   })
  //   .catch( (err)=>{ return res.send({err: err})} )
  // },

  get_followers: function(req,res){
    var userId = req.body.userId; sails.log.info(userId);
    User.findOne({id: userId})
    .populate('followers')
    .then( (user)=>{  // Thông tin người dùng
      let final_followers = user.followers;
      let promises=[];

      for(var i = 0 ; i < final_followers.length; i++){
        promises.push(UserService.get_follow(final_followers[i]));
        // Follow.findOne({id: follow.id})
        // .populateAll()
        // .exec(function(err, result){
        //   sails.log.info(result);
        // })
      }
      Promise.all(promises).then( (followers)=>{
        sails.log.info(followers);
        final_followers = followers;
        user.followers = final_followers;
        return res.send({ok:final_followers});
      })
      .catch( err => res.send({err: err}))

    })
    .catch( (err)=>{ res.send({err: err})} )
  },


  get_followings: function(req,res){
    var userId = req.body.userId;
    User.find({id: userId}).populate('followings')
    .then( (followings)=>{  sails.log.info('followings: ', followings);
      return res.send({followings: followings});
    } )
    .catch( (err)=>{ return res.send({err: err})} )
  }
};
