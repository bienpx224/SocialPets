/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	addMessage : function(req,res){
		let {msg,userSendName, userSendId} = req.body;
		Message.create(msg).exec(function( err, message){
      if(err) {sails.log.error("Lỗi tạo message: ", err); return res.send({err});}
      if(!message) return res.send({err:"not found message"});
      sails.log.info("Tạo thành công message", message.content);

			Message.findOne({id:message.id}, (err,messageData)=>{
				if(err) sails.log.error("err:",err);
				if(messageData){

					Inbox.update({id:msg.inboxId}, {messageIdLatest:message.id}, (err,inbox0)=>{
						if(err) console.log("err inbox: ",err);
						if(!inbox0) console.log("not found inbox: ");

						Inbox.find({$or:[{first_userId:msg.send_userId}, {second_userId: msg.send_userId}]})
						.populateAll()
						.sort({updatedAt: -1})
						.then( (listInbox)=>{
							if(listInbox){

								Inbox.find({$or:[{first_userId:messageData.receive_userId}, {second_userId: messageData.receive_userId}]})
								.populateAll()
								.sort({updatedAt: -1})
								.then( (listInboxReceive)=>{
									if(listInboxReceive){
										sails.io.sockets.emit('message', {userId:messageData.receive_userId, data:listInboxReceive, userSendName });
										return res.send({message: messageData,listInbox});
									}else{ return res.send({err:"not found list inbox"})}
								})
								.catch( (err)=>{ return res.send({err:err})})

							}else{ return res.send({err:"not found list inbox"})}
						})
						.catch( (err)=>{ return res.send({err:err})})

					})
				}else{
		      return res.send({err:"not found messageData"});
				}
			})
    });
	},
	getMessageById: function(req,res){
		let {id} = req.body;
		Message.findOne({id})
		.populateAll()
		.then( (message)=>{
			if(message){
				return res.send({message});
			}else{
				return res.send({err: "not found message"});
			}
		})
		.catch( (err)=>{
			return res.send({err:err});
		})
	},
	setIsRead: function(req,res){ console.log("Set is read: ");
		let {id, userId} = req.body;
		Message.update({$and:[{inboxId:id}, {isRead: false}, {receive_userId: userId}]}, {isRead: true}, (err, listMsg)=>{
			if(err){ return res.send({err:err})}
			if(!listMsg) return res.send({err:"not found listMsg is read"});

			Inbox.findOne({id})
			.populateAll()
			.then( (inboxData)=>{
				if(inboxData){

					Inbox.find({$or:[{first_userId:userId}, {second_userId: userId}]})
					.populateAll()
					.sort({updatedAt: -1})
					.then( (listInboxReceive)=>{
						if(listInboxReceive){

							return res.send({inboxData, listInbox:listInboxReceive});
						}else{ return res.send({err:"not found list inbox"})}
					})
					.catch( (err)=>{ return res.send({err:err})})

				}else{ return res.send({err:"not found list inbox"})}
			})
			.catch( (err)=>{ console.log(err); return res.send({err:err})})

		})
	}

};
