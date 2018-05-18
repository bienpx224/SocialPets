/**
 * DislikeController
 *
 * @description :: Server-side logic for managing dislikes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add : function(req,res){
			let {userId,feedback_data} = req.body;
			Feedback.create(feedback_data).exec(function( err, feedback){
	      if(err) {sails.log.error("Lỗi tạo feedback: ", err); return res.send(err);}
	      if(!feedback) return res.send("Not found feedback");
	      sails.log.info("Tạo thành công feedback", feedback.title);
				let historyInfo = {
					userId : userId,
					action : "Đã gửi phản hồi: "+feedback.title,
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
				User.findOne({id:userId}, (err,user)=>{
					if(err) sails.log.error("không tạo được point");
					let point = parseInt(user.point) + 3;
					User.update({id: userId}, {point})
					.exec(function(err, userUpdated){
						if(userUpdated) sails.log.info("Update point thành công: ", userUpdated[0].point);
					})
				})
	      return res.send({ok:feedback});
	    });
	},
	getListFeedback: function(req,res){
		Feedback.find()
		.populateAll()
		.sort({createdAt: -1})
		.then( (listFeedback)=>{
			if(listFeedback){
				res.send({listFeedback});
			}else{
				res.send({err:"not found"});
			}
		})
		.catch( (err)=>{res.send({err:err})})
	},
	setIsRead: function(req,res){ console.log('setIsRead: ');
		Feedback.update({}, {isRead: true}, (err, listFeedback)=>{
			if(err){ return res.send({err:err})}
			if(!listFeedback) return res.send({err:"not found listMsg is read"});
			res.send({listFeedback});
		})
	}
};
