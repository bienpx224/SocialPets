/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var base64Img = require('base64-img');
var http = require('https');
var imgur = require('imgur-node-api'),
path = require('path');
fs = require('fs');

module.exports = {
  index: function(req,res){
    return res.view();
  },
  addPost: function(req,res){
    var post = req.body;
    post.isActive = true;
    if(!post.content || post.content.length ===0){
      if(!post.image || post.image.length === 0 || post.image.indexOf('http:') === -1){
        res.send({err:"Not enought information"})
      }else{

      }
    }
    Post.create(post, function(err, post){
      if(err){
        sails.log.error("Đăng bài thất bại :", err);
         res.send({err: err});
      }
      if(post){
        Post.findOne({id: post.id}).populateAll()
        .then( (newPost)=>{
          sails.log.info("Đăng bài thành công : ", newPost.content);
          var point = parseInt(newPost.userId.point) + 3;
          User.update({id: newPost.userId.id}, {point})
          .exec(function(err, userUpdated){
            if(err){
              sails.log.error("Đã có lỗi khi update point: ", err);
              res.send({err: err})
            }else{
              sails.log.info("Update point thành công : ");
              let historyInfo = {
                userId : newPost.userId.id,
                action : "Cập nhật bài đăng mới",
                isActive : true,
                related_postId : newPost.id
              }
              History.create(historyInfo ,(err, history)=>{
                if(err) sails.log.info("Có lỗi khi tạo lịch sử : ", err);
                if(!history){
                  sails.log.error("không tạo được History");
                }else{
                  sails.log.info("Đã tạo thành công lịch sử : ", history.action);
                }
              })

            }
          })
          res.send({ok: newPost})
        })
        .catch( err2 => res.send({err: err2}));
      }
    })
  },
  handleImg: function(req,res2){ sails.log("Đã nhận yêu cầu xử lý ảnh");
    var filepath = base64Img.imgSync(req.body.result, 'assets/images/data', req.body.name);
    imgur.setClientID("cd1685e78d29685");
    imgur.upload(filepath, function (err, res) {
      fs.unlink(filepath, (err) => {
        if (err) sails.log.info(err);
        sails.log.info(filepath+' was deleted');
      });
      if(err) res2.send({err:"Server upload ảnh hiện không được ! Thử lại sau"})

      if(res) {
        sails.log.info("Link ảnh đã xử lý xong: ", res.data.link);
        res2.send({link:res.data.link});
      }
      else{ res2.send({err:"Lỗi.. Không lưu được ảnh. "})} // Log the imgur url
    });

  },
  getPostNewsfeed: function(req, res){
    let {userId, skip} = req.body;
    if(!userId) res.send({err: "Không có userId"});
    User.findOne({id: userId})
		.populateAll()
		.then( (user)=>{
			let list_following = user.followings;
			let list_id_following = [];
			for(let i=0; i<list_following.length; i++){
				list_id_following.push(list_following[i].followed);
			}
			list_id_following.push(userId, skip);
			Post.find({$and:[ {userId: {$in: list_id_following}},{isActive: true}] })
      .populateAll()
      .sort({createdAt: -1, updatedAt: -1})
      .skip(skip)
			.limit(10)
			.then( (posts)=>{
			  // sails.log.info("Lấy bài đăng cho Newfeed gồm:  ", posts.length);
				return res.send({posts: posts})
			})
			.catch( (err) =>{ res.send({err:"Có lỗi tìm posts:"})} )
		})
    .catch( (err)=>{ res.send({err:err}) })

  },
  deleteAllPostOfUser: function(req,res){
    let {userId} = req.body;
    Post.update({userId}, {isActive:false}, (err, listPost)=>{
			if(err){ res.send({err})}
			else if(listPost){
				let historyInfo = {
					userId : listPost[0].userId,
					action : "Đã từ bỏ 1 em listPost đáng yêu",
					related_listPostId : listPost[0].id,
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
					res.send({listPost})
			}
			else { res.send({err:"Không thấy listPost"}) }
		})
  },
  activeAllPost: function(req,res){
    Post.update({}, {isActive:true}, (err, listPost)=>{
			if(err){ res.send({err})}
			else if(listPost){

					res.send({listPost})
			}
			else { res.send({err:"Không thấy listPost"}) }
		})
  },

  getListMyPost: function(req,res){
    let {userId,skip} = req.body;
    if(!userId)  res.send({err: "Không có userId"});
    Post.find({userId, isActive:true})
    .populateAll()
    .sort({createdAt: -1, updatedAt: -1})
    .limit(10)
    .skip(skip)
    .then( (posts)=>{
        res.send({posts: posts})
    })
    .catch( (err)=>{ res.send({err:"Có lỗi tìm user"})})
  }

	// addPost: function(req,res,next){   // POST data
 //    var title = req.body ? req.body.title : undefined,
 //        detail = req.body ? req.body.detail : undefined;      sails.log.info("title :"+title+"   Detail: "+detail)
 //    // if(!req.user){
 //    //   return res.badRequest("Cannot add Post without a logged in user!!");
 //    // }else if(! title && ! detail){
 //    //   return res.badRequest("need a title or detail to create Post!!");
 //    // }else{
 //      Post.create({ title: title ||'', detail:detail||''})
 //        .then( (Post)=>{
 //            req.user.Posts.add(Post);
 //            req.user.save()
 //            .then( () => res.json(Post) )
 //            .catch( err => res.serverError(err) );
 //        })
 //        .catch( err => res.serverError(err));
 //    // }
 //  },

  // getPost: function(req,res){
  //   var PostId = req.body ? req.body.PostId : undefined;
  //   if(!PostId){
  //     return req.badRequest("need id of Post");
  //   }else{
  //     Post.findOne({id:PostId}).populate('userId')
  //     .then( (Post)=>{
  //       if(!Post){
  //         return res.notFound("Post not found!!!");
  //       }else{
  //         res.locals.Post = Post;
  //         return res.json(Post);
  //       }
  //     })
  //     .catch(err => res.serverError(err));
  //   }
  // },

 //  getPosts: function(req,res){
 //    res.locals.paged = req.query.paged || 1;
 //    res.locals.posts_per_page = req.query.posts_per_page || 20;
 //    Post.find()
 //    .paginate({page: res.locals.paged, limit: res.locals.posts_per_page})
 //    .populate('userId')
 //    .then( function(Posts){
 //      if(! Posts){
 //        return res.notFound("Posts not found!!!");
 //      }else{
 //        return res.json(Posts);
 //      }
 //    })
 //    .catch( err=> res.serverError(err));
 //  },

 //  updatePost: function(req,res){
 //    var PostId = req.body ? req.body.PostId: undefined,
 //        title = req.body ? req.body.title: undefined,
 //        detail = req.body ? req.body.detail: undefined;
 //    if ( ! PostId ) {
 //        return res.badRequest("Need id of Post to update");
 //    } else if ( ! title && ! detail) {
 //        return res.badRequest("Need a title or detail to update Post");
 //    } else {
 //      Post.findOne({id: PostId})
 //      .then( Post => {
 //        if( !Post){
 //          return res.badRequest("Post not found!!!");
 //        }else{
 //          if( Post.userId != req.user.id){
 //            return res.forbidden("Post is not yours to update");
 //          }else{
 //            Post.title = title?title:Post.title; //if title not undefined, then give it the value of title else give it its existing value
 //                        Post.detail = detail?detail:Post.detail;
 //                        Post.save()
 //                            .then ( () => res.json(Post) )
 //                            .catch((err)=>res.serverError(err));
 //          }
 //        }
 //      })
 //      .catch( err => res.serverError(err));
 //    }
 //  },

 //  removePost: function(req, res){

 //    var PostId = req.body ? req.body.PostId : undefined;
 //    if (! PostId) {
 //        return res.badRequest("Need id of Post");
 //    } else {
 //        Post.findOne( { id : PostId } )
 //            .then( (Post) => {
 //                if (!Post) {
 //                    return res.notFound("Post not found");
 //                } else if (Post.userId != req.user.id ) {   //TODO OR logged in user not admin role
 //                    return res.forbidden("Post not yours to remove");
 //                } else {
 //                    Post.destroy( { id : PostId })
 //                        .then( (Post) => {
 //                            if(Post.length === 0) {
 //                                return res.notFound("Post not deleted");
 //                            }
 //                            return res.json(Post);
 //                        })
 //                        .catch((err)=> res.serverError(err));
 //                }
 //            })
 //            .catch((err)=> res.serverError(err));
 //    }
  // }
};
