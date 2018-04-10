/**
 * FriendController
 *
 * @description :: Server-side logic for managing friends
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	follow: function(req,res){
    let {userId, followed} = req.body;
		sails.log.info("Có yêu cầu follow của "+userId+" gửi cho "+followed+" !");
    Follow.findOne({userId, followed})
    .then( (follow)=>{
      if(follow){
        if(follow.isActive === true) {
					sails.log.info("Đang following người này rồi.");
					return res.send({err: 'You are following this user!!'});
				}
        if(follow.isActive === false){
          Follow.update({id: follow.id},{isActive: true})
          .exec( (err, updated)=>{
            if(err){
							sails.log.error("Có lỗi :"+err);
              return res.send({err: err});
            }
            if(updated){
							let historyInfo = {
								userId : userId,
								action : "Đã bắt đầu theo dõi ",
								isActive : true,
								related_userId : follow.followed
							}
							History.create(historyInfo ,(err, history)=>{
								if(err) sails.log.info("Có lỗi khi tạo lịch sử : ", err);
								if(!history){
									sails.log.error("không tạo được History");
								}else{
									sails.log.info("Đã tạo thành công lịch sử : ", history.action);
								}
							})
							sails.log.info("Đã following lại người đó.");
              return res.send({updated: updated});
            }
          })
        }
      }else{
        Follow.create({userId, followed, isActive:true})
        .exec( (err, follow_success)=>{
          if(err){
						sails.log.error("Có lỗi :"+err);
            return res.send({err: "errror When create follow: "+err});
          }
          if(follow_success){
						sails.log.info("Đã bắt đầu following người đó. ", follow_success.followed);
						///////////////////////   Tăng điểm cho 2 người, người theo dõi và người được theo dõi   ////////////
						Follow.findOne({id: follow_success.id})
						.populate('userId')
						.populate('followed')
						.then( (data_follow)=>{
							let userId_1 = data_follow.userId.id;
							let userId_2 = data_follow.followed.id;
							let point_1 = parseInt(data_follow.userId.point)+1;
							let point_2 = parseInt(data_follow.followed.point)+2;

							User.update({id: userId_1}, {point:point_1})
		          .exec(function(err, userUpdated_1){
		            if(err){
		              sails.log.error("Đã có lỗi khi update point: ", err);
		              res.send({err: err})
		            }else{
		              sails.log.info("Update point thành công : ");
		              let historyInfo = {
		                userId : data_follow.userId.id,
		                action : "Đã bắt đầu theo dõi ",
		                isActive : true,
		                related_userId : data_follow.followed.id
		              }
		              History.create(historyInfo ,(err, history)=>{
		                if(err) sails.log.info("Có lỗi khi tạo lịch sử : ", err);
		                if(!history){
		                  sails.log.error("không tạo được History");
		                }else{
		                  sails.log.info("Đã tạo thành công lịch sử : ", history.action);
		                }
		              })

									User.update({id: userId_2}, {point: point_2})
									.exec( (err, userUpdated_2)=>{
										if(err) sails.log.error("Lỗi khi update");
										res.send({follow: follow_success});
									})

		            }
		          })

						})
						.catch(err => res.send({err: err}))
          }
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
        if(follow.isActive === false) return res.send({err: 'You are unfollowing this user!!'});
        if(follow.isActive === true){
          Follow.update({id: follow.id},{isActive: false})
          .exec( (err, updated)=>{
            if(err){
              return res.send({err: err});
            }
            if(updated){

							let historyInfo = {
								userId : userId,
								action : "Đã hủy theo dõi ",
								isActive : true,
								related_userId : followed
							}
							History.create(historyInfo ,(err, history)=>{
								if(err) sails.log.info("Có lỗi khi tạo lịch sử : ", err);
								if(!history){
									sails.log.error("không tạo được History");
								}else{
									sails.log.info("Đã tạo thành công lịch sử : ", history.action);
								}
							})

              return res.send({updated: updated});
            }
              return res.send({err: "Something wrong when update!!"});

          })
        }
      }else{
         return res.send({err:"You're not following this user !!"});
      }

    })
    .catch( err => res.send({err: err}))
  },

  get_followers: function(req,res){
    var userId = req.body.userId;
		sails.log.info(" Có yêu cầu lấy danh sách người đang theo dõi user này : ",userId);
    User.findOne({id: userId})
    .populate('followers')
    .then( (user)=>{  // Thông tin người dùng
			if(!user) res.send({err: "Không tìm thấy user!"});
      let final_followers = user.followers;
      let promises=[];
      for(var i = 0 ; i < final_followers.length; i++){
        promises.push(UserService.get_follow(final_followers[i]));
      }
      Promise.all(promises).then( (followers)=>{
				if(!followers) res.send({err: "Không tìm thấy danh sách followers!"});
        final_followers = followers;
        user.followers = final_followers;
				sails.log.info("Danh sách những người  đang theo dõi user trên : ",final_followers.length);
        res.send({ok:final_followers});
      })
      .catch( (err) => {res.send({err: "Lỗi danh sách list followers"})})

    })
    .catch( (err)=>{ res.send({err: "Lỗi khi tìm người dùng userId"})} )
  },

  get_followings: function(req,res){
		var userId = req.body.userId;
		sails.log.info(" Có yêu cầu lấy danh sách đang được user này theo dõi : ",userId);
    User.findOne({id: userId})
    .populate('followings')
    .then( (user)=>{  // Thông tin người dùng
			if(!user) res.send({err: "Không tìm thấy user!"});
      let final_followings = user.followings;
      let promises=[];
      for(var i = 0 ; i < final_followings.length; i++){
        if(final_followings[i].isActive === true)	promises.push(UserService.get_follow(final_followings[i]));
      }
      Promise.all(promises).then( (followings)=>{
				if(!followings) res.send({err: "Không tìm thấy danh sách followers!"});
        final_followings = followings;
        user.followings = final_followings;
				sails.log.info("Danh sách những người  đang theo dõi user trên : ",final_followings.length);
        res.send({ok:final_followings});
      })
      .catch( (err) => {res.send({err: "Lỗi danh sách list followings"})})
    })
    .catch( (err)=>{ res.send({err: "Lỗi khi tìm người dùng userId"})} )
  },

	recommend_rank: function(req,res){
		let userId = req.body.userId;
		/////////////////////////////   Danh sách ID của những người dùng mà đang được user này theo dõi
		User.findOne({id: userId})
		.populate('followings')
		.then( (user)=>{
			if(!user) res.send({err: "Không tìm thấy user!"});
			let list_following = user.followings;
			let list_id_following = [];
			for(let i=0; i<list_following.length; i++){
				if(list_following[i].isActive === true) list_id_following.push(list_following[i].followed);
			}
			list_id_following.push(userId);
			User.find({id: {$nin: list_id_following}})
			.limit(10)
			.sort({point: -1})
			.then( (users)=>{
				if(!users) res.send({err: "Không tìm thấy list user recommend!"});
				sails.log.info("Danh sach recommend_rank: ", users.length);
				return res.send({ok: users})
			})
			.catch( (err) =>{ res.send({err:err})} )

		})
		///////////////////////////////  END  ////////////////////////////

	},

	recommend_common: function(req,res){
		let userId = req.body.userId;
		/////////////////////////////   Danh sách ID của những người dùng mà đang được user này theo dõi
		User.findOne({id: userId})
		.populate('followings')
		.then( (user)=>{
			if(!user) res.send({err: "Không tìm thấy user!"});
			let list_following = user.followings;
			let list_id_following = [];
			for(let i=0; i<list_following.length; i++){
				if(list_following[i].isActive === true) list_id_following.push(list_following[i].followed);
			}
			list_id_following.push(userId);
			User.find({ id: {$nin: list_id_following}, $or: [{"gender": new RegExp(user.gender)}, {"address":new RegExp(user.address)}, {"year_date": new RegExp(user.year_date)}  ] })
			.limit(10)
			.then( (users)=>{
				if(!users) res.send({err: "Không tìm thấy list user recommend!"});
				sails.log.info("Danh sach recommend_common: ", users.length);
				return res.send({ok: users})
			})
			.catch( (err) =>{ res.send({err:err})} )

		})
		///////////////////////////////  END  ////////////////////////////

	}


};
