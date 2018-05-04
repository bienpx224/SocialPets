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

    Inbox.findOne({first_userId:inbox_data.first_userId, second_userId:inbox_data.second_userId})
		.populateAll()
    .then( (inbox)=>{
      if(inbox){
        if(inbox.isActive === true) {
					sails.log.info("Đã có inbox người này rồi: ", inbox);
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
};
