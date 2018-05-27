/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  searchUser: function(req, res){
    let {userId, key, limit, skip} = req.body;
    let arrUserId = [];  arrUserId.push(userId);
    User.find(
      {$and:[
        {$or:[
          {"name": new RegExp(key, 'ui')},{"email": new RegExp(key,'ui')}, {"phone": new RegExp(key,'ui')}
        ]},
        {id:{$nin:arrUserId} }
      ]
      }
    )
    .limit(limit)
    .skip(skip)
    .then( (listUser)=>{
      if(!listUser) res.send({err:"Not found"})
      res.send({listUser})
    })
    .catch( err=>res.send({err}))
  },
  blockUserById: function(req,res){
    let {id} = req.body;
    User.update({id},{isActive: false}, (err, listUser)=>{
      if(err) res.send({err:"Có lỗi:"+err})
      if(!listUser || listUser.length === 0 ){
        res.send({err:"Not found, not success"})
      }else{
        User.find()
        .populateAll()
        .sort({createdAt: -1})
        .then( (listAllUser)=>{
          if(!listAllUser){
            sails.log.error("Not found listAllUser");
            res.send({err:"Not found listAllUser"})
          }else{
            res.send({listAllUser});
          }
        })
        .catch( err=>res.send({err}))
      }
    })
  },
  activeUserById: function(req,res){
    let {id} = req.body;
    User.update({id},{isActive: true}, (err, listUser)=>{
      if(err) res.send({err:"Có lỗi:"+err})
      if(!listUser || listUser.length === 0 ){
        res.send({err:"Not found, not success"})
      }else{
        User.find()
        .populateAll()
        .sort({createdAt: -1})
        .then( (listAllUser)=>{
          if(!listAllUser){
            sails.log.error("Not found listAllUser");
            res.send({err:"Not found listAllUser"})
          }else{
            res.send({listAllUser});
          }
        })
        .catch( err=>res.send({err}))
      }
    })
  },
  setAdminById: function(req,res){
    let {id} = req.body;
    User.update({id},{isAdmin: true}, (err, listUser)=>{
      if(err) res.send({err:"Có lỗi:"+err})
      if(!listUser || listUser.length === 0 ){
        res.send({err:"Not found, not success"})
      }else{
        User.find()
        .populateAll()
        .sort({createdAt: -1})
        .then( (listAllUser)=>{
          if(!listAllUser){
            sails.log.error("Not found listAllUser");
            res.send({err:"Not found listAllUser"})
          }else{
            res.send({listAllUser});
          }
        })
        .catch( err=>res.send({err}))
      }
    })
  },
  unsetAdminById: function(req,res){
    let {id} = req.body;
    User.update({id},{isAdmin: false}, (err, listUser)=>{
      if(err) res.send({err:"Có lỗi:"+err})
      if(!listUser || listUser.length === 0 ){
        res.send({err:"Not found, not success"})
      }else{
        User.find()
        .populateAll()
        .sort({createdAt: -1})
        .then( (listAllUser)=>{
          if(!listAllUser){
            sails.log.error("Not found listAllUser");
            res.send({err:"Not found listAllUser"})
          }else{
            res.send({listAllUser});
          }
        })
        .catch( err=>res.send({err}))
      }
    })
  },
  getAllUser: function(req,res){
    User.find()
    .populateAll()
    .sort({createdAt: -1})
    .then( (listAllUser)=>{
      if(!listAllUser){
        sails.log.error("Not found listAllUser");
        res.send({err:"Not found listAllUser"})
      }else{
        res.send({listAllUser});
      }

    })
    .catch( err=>res.send({err}))
  },
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
          if(user.isActive === true){
            req.session.authenticated = true;
            User.update({email: Obj.email},{isOnline: true}, function(err2, user2){
              sails.log.info("Đăng nhập thành công");
              return res.send({user: user2[0]});
            })
          }else{
            return res.send({error:"Your account was blocked !!"});
          }

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
         res.send({error: err});
      }else if(!user){
         res.send({notFound: "notFound"});
      }else{
         res.send({user: user});
      }
    })
  },
  getUserById: function(req,res){
    let {userId} = req.body;
    User.findOne({id:userId}, function(err, user){
      if(err){
         res.send({error: err});
      }else if(!user){
         res.send({err: "notFound"});
      }else{
         res.send({user: user});
      }
    })
  },
  register: function(req,res){
    var Obj = req.body;

    if(!Obj.secret){Obj.secret = Obj.password}
    if(!Obj.day_date){Obj.day_date = "22"}
    if(!Obj.month_date){Obj.month_date = "4"}
    if(!Obj.year_date){Obj.year_date = "1996"}
    if(!Obj.age_range){Obj.age_range = "23"}
    if(!Obj.gender){Obj.gender = "Female"}
    if(!Obj.address){Obj.address = "Somewhere"}
    if(!Obj.country){Obj.country = "Viet Nam"}
    if(!Obj.point){Obj.point = "10"}
    if(!Obj.picture){Obj.picture = "https://i.imgur.com/x53FmYL.jpg"}
    if(!Obj.cover){Obj.cover = "https://i.imgur.com/8jp0Y6M.jpg"}
    if(!Obj.isActive){Obj.isActive = "true"}
    if(!Obj.point){Obj.point = "10"}

    sails.log.info("Có yêu cầu đăng ký tài khoản : ", Obj.name);

    User.findOne({email: Obj.email}, function(err2, this_user){
      if(this_user){
          res.send({exist:"Đã tồn tại tài khoản này", id:this_user.id});
      }else if(err2){
        sails.log.error("Lỗi đăng ký tài khoản:22222222222 ", err2);
        res.send({err, err2})
      }else{

        User.create(Obj).exec(function( err, user){
          if(err) {
            sails.log.error("Lỗi đăng ký tài khoản: ", err);
            res.send({err})
          }else if(!user){
            res.send({err:"Not found user when created"});
          }else{
            sails.log.info("Đăng ký thành công ");
            res.send(user);
          }
        });

      }
    })


  },
  updateInfo: function (req,res){
    let {Obj,userId} = req.body;
    sails.log.info("Có yêu cầu thay đổi thông tin cá nhân : ");
    User.update({id: userId}, Obj,function(err, user){
      if(err){
        sails.log.error("Đã có lỗi thay đổi thông tin cá nhân: ", err);
        return res.send(err)
      }
      if(user){
        user = user[0];
        sails.log.info("Thay đổi thành công cho user: ", user);
        let point = parseInt(user.point)+1;
        User.update({id: userId}, {point: point}, (err, userUpdatedPoint)=>{
          if(err) sails.log.error("Lỗi update point: ", err);
          if(userUpdatedPoint) sails.log.info("Update point thành công :  point: ",userUpdatedPoint);
        })
        let historyInfo = {
          userId : userId,
          action : "Cập nhật thông tin cá nhân",
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
        return res.send({user:user})
      }else{
        sails.log.error("update xong không có user");
      }
    })
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
        let point = parseInt(updated[0].point)+1;
        User.update({id: id}, {point: point}, (err, userUpdatedPoint)=>{
          if(err) sails.log.error("Lỗi update point: ", err)
          sails.log.info("Update point thành công : ");
        })
        let historyInfo = {
          userId : updated[0].id,
          action : "Cập nhật ảnh đại diện mới",
          image  : link,
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
        let point = parseInt(updated[0].point)+1;
        User.update({id: id}, {point: point}, (err, userUpdatedPoint)=>{
          if(err) sails.log.error("Lỗi update point: ", err)
          sails.log.info("Update point thành công : ");
        })
        let historyInfo = {
          userId : updated[0].id,
          action : "Cập nhật ảnh bìa mới",
          image  : link,
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
