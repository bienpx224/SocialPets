/**
 * InboxController
 *
 * @description :: Server-side logic for managing inboxes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	createInbox: function(req,res){
    // let {first_userId, second_userId} = req.body;
		let inbox_data = req.body;

    Inbox.findOne( {$or:[{first_userId:inbox_data.first_userId, second_userId:inbox_data.second_userId},
			 {second_userId:inbox_data.first_userId, first_userId:inbox_data.second_userId}] }
		)
		.populateAll()
    .then( (inbox)=>{
      if(inbox){
        if(inbox.isActive === true) {
					sails.log.info("Đã có inbox người này rồi: ");
					return res.send({ok: 'Đã có inbox'});
				}
      }else{
        Inbox.create(inbox_data)
        .exec( (err, inbox_success)=>{
          if(err){
						sails.log.error("Có lỗi :"+err);
            return res.send({err: "error When create inbox: "+err});
          }else
          if(inbox_success){
						sails.log.info("Đã bắt đầu có inbox người đó. ", inbox_success.second_userId);
						return res.send({ok: "Đã tạo thành công"});
          }
        })
      }

    })
    .catch( err => res.send({err: "err:"+err}))
  },

	getListInbox: function(req,res){
		let {userId, name} = req.body;
		Inbox.find({$or:[{first_userId:userId}, {second_userId: userId}]})
		.populateAll()
		.sort({updatedAt: -1})
		.then( (listInbox)=>{
			if(listInbox){
				name = name.toUpperCase();
				let arr = [];
				let count = listInbox.length;
				for(let i = 0; i<=count-1; i++){
					var name1 = listInbox[i].first_userId.name.toUpperCase();
		      var name2 = listInbox[i].second_userId.name.toUpperCase();
		      if(name1.search(name) !== -1 || name2.search(name) !== -1){
		        arr.push(listInbox[i]);
		      }
				}

				res.send({listInbox: arr});
			}else{ return res.send({err:"not found list inbox"})}
		})
		.catch( (err)=>{ return res.send({err:err})})
	},
	getInboxById: function(req,res){
		let id = req.body.inboxId;
		Inbox.findOne({id})
		.populateAll()
		.then( (inboxData)=>{
			if(inboxData){
				return res.send({inboxData});
			}else{ return res.send({err:"not found list inbox"})}
		})
		.catch( (err)=>{ console.log(err); return res.send({err:err})})
	},
};
