/**
 * HistoryController
 *
 * @description :: Server-side logic for managing histories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getHistoryUser: function(req,res){
		let {userId,skip} = req.body;
		History.find({userId})
		.populateAll()
		.sort({createdAt: -1})
		.limit(10)
		.skip(skip)
		.then( (listHistory)=>{
			sails.log.info("Có yêu cầu lấy danh sách lịch sử của người dùng : ", userId);
			sails.log.info("danh sách lịch sử của người dùng : ", listHistory.length);
			return res.send({listHistory});
		})
		.catch( (err)=>{ return res.send({err:err}) })
	},
};
