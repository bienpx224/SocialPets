/**
 * LoveController
 *
 * @description :: Server-side logic for managing loves
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getListPet:function(req,res){
    var {userId} = req.body;
		sails.log.info("Có Yêu cầu lấy listPet của userId: ", userId);
		Pet.find({userId, isActive:true})
		.populateAll()
		.exec( (err, listPet)=>{
			if( err) res.send({err: err});
			if(listPet){
				sails.log.info("listPet cua userId do la: ", listPet.length);
				res.send({listPet:listPet});
			}else{
				res.send({err: "Không có listPet"});
			}
		})
  },

	addPet : function(req,res){
		let {userId,pet_data} = req.body;
		sails.log.info("Có Yêu cầu tạo Pet cho userId: ", Pet.userId);
		Pet.create(pet_data).exec(function( err, pet){
      if(err) {sails.log.error("Lỗi tạo pet: ", err); return res.send(err);}
      if(!pet) return res.send("Not found pet");
      sails.log.info("Tạo thành công pet", pet.name);
			let historyInfo = {
				userId : userId,
				action : "Nuôi 1 em pet mới",
				related_petId : pet.id,
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
				let point = parseInt(user.point) + 1;
				User.update({id: userId}, {point})
				.exec(function(err, userUpdated){
					if(userUpdated) sails.log.info("Update point thành công: ", userUpdated[0].point);
				})
			})
      return res.send({ok:pet});
    });
	},
	deletePet : function(req,res){
		let {petId} = req.body;
		sails.log.info("Có Yêu delete Pet cho petId: ", petId);
		Pet.update({id:petId}, {isActive:false}, (err, pet)=>{
			if(err){ res.send({err})}
			else if(pet){
				let historyInfo = {
					userId : pet[0].userId,
					action : "Đã từ bỏ 1 em Pet đáng yêu",
					related_petId : pet[0].id,
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

					res.send({pet})
			}
			else { res.send({err:"Không thấy pet"}) }
		})
	},
	unDeletePet: function(req,res){
		let {petId} = req.body;
		sails.log.info("Có Yêu Undelete Pet cho petId: ", petId);
		Pet.update({id:petId}, {isActive:true}, (err, pet)=>{
			if(err){ res.send({err})}
			else if(pet){
				let historyInfo = {
					userId : pet[0].userId,
					action : "Đã chăm sóc lại em Pet trước đó đã bỏ",
					related_petId : pet[0].id,
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
				res.send({pet})
			}
			else { res.send({err:"Không thấy pet"}) }
		})
	}
};
