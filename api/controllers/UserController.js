/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function(req,res){
    Obj = req.body;
     console.log("Có user Đăng nhập : ", Obj);
    User.findOne({email: Obj.email}, function(err, user){
      if(err){ return res.send("Error")}
      if(!user){
        console.log("Sai email");
        return res.send({error:"Your email is wrong !!"});
      }else{
        if(user.secret === Obj.password){
          req.session.authenticated = true;
          User.update({email: Obj.email},{isOnline: true}, function(err2, user2){
            console.log("Đăng nhập thành công");
            return res.send({user: user2[0]});
          })
        }else{
          console.log("Sai password");
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
    console.log("Có yêu cầu đăng ký tài khoản : ", Obj);
    User.create(Obj).exec(function( err, user){
      if(err) return res.send(err);
      if(!user) return res.send("Not found user");
      console.log("Đăng ký thành công ");
      return res.send(user);
    });
  },
  changePicture: function(req,res){
    let {link, id} = req.body;
    console.log("Có yêu cầu Thay đổi ảnh đại diện của id : ", id);
    User.update({id: id}, {picture: link})
    .exec(function(err, updated){
      if(err){
        console.log("Đã có lỗi khi đổi ảnh đại diện: ", err);
        return res.send({err: err})
      }else{
        console.log("Thay đổi thành công: ", updated);
        return res.send({ok: updated})
      }
    })
  },
  changeCover: function(req,res){
    let {link, id} = req.body;
    console.log("Có yêu cầu Thay đổi ảnh bìa của id : ", id);
    User.update({id: id}, {cover: link})
    .exec(function(err, updated){
      if(err){
        console.log("Đã có lỗi khi đổi ảnh bìa: ", err);
        return res.send({err: err})
      }else{
        console.log("Thay đổi thành công: ", updated);
        return res.send({ok: updated})
      }
    })
  }
};
