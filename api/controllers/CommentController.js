/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addComment: function(req,res){
		let {postId, userId,content,related_userId} = req.body;
		let Obj = {
			postId, userId, content, isActive:true
		}
		Comment.create(Obj).exec( (err, comment)=>{
			if( err) res.send({err});
			if(comment){
				let historyInfo = {
					userId : userId,
					action : "Bình luận trong bài đăng",
					isActive : true,
					related_postId : postId,
					related_cmtId : comment.id,
					related_userId: related_userId
				}
				History.create(historyInfo ,(err, history)=>{
					if(err) sails.log.info("Có lỗi khi tạo lịch sử : ", err);
					if(!history){
						sails.log.error("không tạo được History");
					}else{
						sails.log.info("Đã tạo thành công lịch sử : ", history.action);
					}
				})
				let notifyInfo = {
					userId : userId,
					action : "Bình luận trong bài đăng",
					isActive : true,
					related_postId : postId,
					related_cmtId : comment.id,
					related_userId: related_userId
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

				res.send({comment});
			}else{
				res.send({err: "Không có comment"});
			}
		})
	}
};
