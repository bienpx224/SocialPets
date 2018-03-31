/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function(req,res){
    Obj = req.body;
     sails.log.info("Có user Đăng nhập : ", Obj);
    User.findOne({email: Obj.email}, function(err, user){
      if(err){ return res.send("Error")}
      if(!user){
        sails.log.info("Sai email");
        return res.send({error:"Your email is wrong !!"});
      }else{
        if(user.secret === Obj.password){
          req.session.authenticated = true;
          User.update({email: Obj.email},{isOnline: true}, function(err2, user2){
            sails.log.info("Đăng nhập thành công");
            return res.send({user: user2[0]});
          })
        }else{
          sails.log.info("Sai password");
          return res.send({error:"Your password is wrong !!"});
        }
      }
    })
  },
  getUser:function(req,res){
    var {email} = req.body;
    User.findOne({email: email}, function(err, user){
      if(err){
        return res.send({error: err});
      }
      if(!user){
        return res.send({notFound: "notFound"});
      }else{
        return res.send({user: user});
      }
    })
  },
  register: function(req,res){
    var Obj = req.body;
    sails.log.info("Có yêu cầu đăng ký tài khoản : ", Obj);
    User.create(Obj).exec(function( err, user){
      if(err) {sails.log.error("Lỗi đăng ký tài khoản: ", err); return res.send(err);}
      if(!user) return res.send("Not found user");
      sails.log.info("Đăng ký thành công ");
      return res.send(user);
    });
  },
  changePicture: function(req,res){
    let {link, id} = req.body;
    sails.log.info("Có yêu cầu Thay đổi ảnh đại diện của id : ", id);
    User.update({id: id}, {picture: link})
    .exec(function(err, updated){
      if(err){
        sails.log.error("Đã có lỗi khi đổi ảnh đại diện: ", err);
        return res.send({err: err})
      }else{
        sails.log.info("Thay đổi thành công cho user: ", updated[0].name);
        let point = parseInt(updated[0].point)+5;
        User.update({id: id}, {point: point}, (err, userUpdatedPoint)=>{
          if(err) sails.log.error("Lỗi update point: ", err)
          sails.log.info("Update point thành công : ");
        })
        let historyInfo = {
          userId : updated[0].id,
          action : "Cập nhật ảnh đại diện mới",
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
        return res.send({ok: updated})
      }
    })
  },
  changeCover: function(req,res){
    let {link, id} = req.body;
    sails.log.info("Có yêu cầu Thay đổi ảnh bìa của id : ", id);
    User.update({id: id}, {cover: link})
    .exec(function(err, updated){
      if(err){
        sails.log.error("Đã có lỗi khi đổi ảnh bìa: ", err);
        return res.send({err: err})
      }else{
        sails.log.info("Thay đổi thành công cho user: ", updated[0].name);
        let point = parseInt(updated[0].point)+5;
        User.update({id: id}, {point: point}, (err, userUpdatedPoint)=>{
          if(err) sails.log.error("Lỗi update point: ", err)
          sails.log.info("Update point thành công : ");
        })
        let historyInfo = {
          userId : updated[0].id,
          action : "Cập nhật ảnh bìa mới",
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
        return res.send({ok: updated})
      }
    })
  }
};
