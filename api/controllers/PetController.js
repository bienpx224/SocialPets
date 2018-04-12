/**
 * LoveController
 *
 * @description :: Server-side logic for managing loves
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getListPet:function(req,res){
    var {userId} = req.body;
    User.findOne({id: userId})
    .populate('pets')
		.exec( (err, dataUser)=>{
			console.log(dataUser);
			sails.log.info("Có Yêu cầu lấy listPet của userId: ", dataUser.name);
			if( err) res.send({err: err});
			if(dataUser){
				let listPet = dataUser.pets;
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
      return res.send({ok:pet});
    });
	}
};
