/**
 * ReactController
 *
 * @description :: Server-side logic for managing Reacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addReact: function(req,res){
		let {userId, postId,related_userId} = req.body;
		React.findOne({userId, postId})
		.populateAll()
		.exec( (err, oldReact)=>{
			if(oldReact){
				React.destroy({id : oldReact.id }).exec(function(err){
				})
				res.send({ok:"Da xoa"});
			}else{
				if(err) res.send({err});
				React.create({userId, postId}).exec( (err, react)=>{
					if(react){
						let historyInfo = {
		          userId : react.userId,
		          action : "Yêu thích bài đăng ",
							related_postId :react.postId,
							related_userId : related_userId,
		          isActive : true,
		        }
		        History.create(historyInfo ,(err, history)=>{
		          if(err) sails.log.error("Có lỗi khi tạo lịch sử : ", err);
		          if(!history){
		            sails.log.error("không tạo được History");
		          }else{
		            sails.log.info("Đã tạo thành công lịch sử : ", history.action);
		          }
		        })

						if(userId !== related_userId){

							Notification.findOne({$and: [{related_userId: userId}, {related_postId:react.postId }]})
							.exec( (err, noti)=>{
								if(!noti){
									let notifyInfo = {
										userId : related_userId,
										action : "Yêu thích bài đăng",
										isActive : true,
										isRead: false,
										related_postId : postId,
										related_userId: userId,
									}
									Notification.create(notifyInfo, (err, notification)=>{
										if(err) sails.log.info("Có lỗi khi tạo notify : ", err);
										if(!notification){
											sails.log.error("không tạo được Notify");
										}else{
											sails.log.info("Đã tạo thông báo thành công : ", notification.action);
											Notification.findOne({id: notification.id})
												.populateAll()
												.then((notification2)=>{
												if(!notification2){
													sails.log.error("không lấy được Notify");
												}else{
													sails.io.sockets.emit('notify', {userId, data: notification2});
												}
											})
											.catch( (err)=>{sails.log.info("Có lỗi khi lấy notify : ", err);})

										}
									})
								}
							})

						}

						res.send({react})
					}else{
						if(err) res.send({err});
						res.send({err:"Không tạo được react!"});
					}
				})
			}
		})

	}
};
