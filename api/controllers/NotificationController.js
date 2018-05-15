/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getListNotify: function(req,res){
		let {userId} = req.body;
		Notification.find({userId})
		.populateAll()
		.sort({createdAt: -1})
		.then( (listNotify)=>{
			if(listNotify){
				return res.send({listNotify});
			}else{ return res.send({err:"not found list notify"})}
		})
		.catch( (err)=>{ return res.send({err:err})})
	},
	setIsRead: function(req,res){
		let {userId} = req.body;
		Notification.update({userId}, {isRead: true}, (err, listNotify1)=>{
			if(err){ return res.send({err:err})}
			if(!listNotify1) return res.send({err:"not found listMsg is read"});


					Notification.find({userId})
					.populateAll()
					.sort({createdAt: -1})
					.then( (listNotify)=>{
						if(listNotify){
							return res.send({listNotify});
						}else{ return res.send({err:"not found list notify"})}
					})
					.catch( (err)=>{ return res.send({err:err})})

		})
	}
};
