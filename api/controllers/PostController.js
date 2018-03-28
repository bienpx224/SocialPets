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
  addPost: function(req,res){ console.log("Có người vừa đăng bài");
    var post = req.body;
    Post.create(post, function(err, post){
      if(err){
        console.log("Đăng bài thất bại", err);
        return res.send({err: err});
      }
      if(post){
        Post.findOne({id: post.id}).populate('userId')
        .then( (newPost)=>{ console.log("Đăng bài thành công ", newPost);
          return res.send({ok:newPost});
        })
        .catch( err2 => res.send({err: err2}));
      }
    })
  },
  handleImg: function(req,res2){ console.log("Đã nhận yêu cầu xử lý ảnh");
    var filepath = base64Img.imgSync(req.body.result, 'assets/images/data', req.body.name);
    imgur.setClientID("cd1685e78d29685");
    imgur.upload(filepath, function (err, res) {
        fs.unlinkSync(filepath);
      console.log("Đã upload xong file ảnh : ",res.data.link);
      res2.send({link:res.data.link}); // Log the imgur url
    });

  },
  getPostNewsfeed: function(req, res){
    Post.find().sort({createdAt: -1}).populate('userId')
    .then( (posts)=>{
      if(!posts){ res.send({notFound: "not found post"}); }
      else{
        res.send({posts: posts});
      }
    })
    .catch( err => res.send({err: err}))
  }

	// addPost: function(req,res,next){   // POST data
 //    var title = req.body ? req.body.title : undefined,
 //        detail = req.body ? req.body.detail : undefined;      console.log("title :"+title+"   Detail: "+detail)
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
