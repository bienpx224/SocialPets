/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function(req,res){
    Obj = req.body;
    // if(Obj.email === "123"){
    //   req.session.authenticated = true;
    //   req.session.user = Obj;
    //   console.log(req.session);
    //     return res.send("ok");
    // }
    User.findOne({email: Obj.email}, function(err, user){
      if(err){ return res.send("Error")}
      if(!user){
        return res.send({error:"Your email is wrong !!"});
      }else{
        if(user.secret === Obj.password){
          req.session.authenticated = true;
          User.update({email: Obj.email},{isOnline: true}, function(err2, user2){
            // console.log("errUpdate",err2); console.log("userUpdate", user2);
            return res.send({user: user2[0]});
          })
        }else{
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
    User.create(Obj).exec(function( err, user){
      if(err) return res.send(err);
      if(!user) return res.send("Not found user");
      return res.send(user);
    });
  },
  changePicture: function(req,res){
    let {link, id} = req.body;
    User.update({id: id}, {picture: link})
    .exec(function(err, updated){
      if(err){ console.log("update: ", updated);
        return res.send({err: err})
      }else{
        return res.send({ok: updated})
      }
    })
  },
  changeCover: function(req,res){
    let {link, id} = req.body;
    User.update({id: id}, {cover: link})
    .exec(function(err, updated){
      if(err){ console.log("update: ", updated);
        return res.send({err: err})
      }else{
        return res.send({ok: updated})
      }
    })
  }
};
