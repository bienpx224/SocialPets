/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {
  connection: 'mongo',
  attributes: {
    provider: 'STRING',
    uid: 'STRING',
    name:{type:'string', required:true},
    email:{type:'string', unique:true, required:true, email:true },
    password:{type:'string', minLength:6, required:true},
    phone:{type:'string'},
    day_date:{type:'string'},
    month_date:{type:'string'},
    year_date:{type:'string'},
    age_range:{type:'string'},
    gender:{type:'string'},
    picture:{type:'string'},
    cover:{type:'string'},
    address:{type:'string'},
    country:{type:'string'},
    isActive:{type: 'boolean'},
    isOnline:{type:'boolean'},
    description:{type:'string'},
    job:{type:'string'},
    university:{type:'string'},
    // Setting your account
    enableFollow:{type:'boolean'},
    enableSound:{type:'boolean'},
    enableNotification:{type:'boolean'},
    // this defines the others half of our association
    //with idea, this is the 'many' side.

    // Posts of your
    posts:{collection:'Post', via:'userId'},
    // Những người mà bạn đang theo dõi
    followers:{collection:'Follow', via:'followed'},
    // Những người đang theo dõi bạn
    followings:{collection:'Follow', via:'userId'},
    // Những bài viết bạn đã bày tỏ cảm xúc
    reacts:{collection:'React', via:'userId'},
    // nobody know what is it
    secret:{type:'string'},
    //// This tells Sails.js anytime we call the toJSON function to return
    //   the user object, take out the password field.  We don't want that
    //   flying around the Internet!
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      delete obj.secret;
      return obj;
    }
  },
  beforeCreate: function (values, cb) {

    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return cb(err);
      values.password = hash;
      //calling cb() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
      cb();
    });
  },
  comparePassword : function (password, user, cb) {
     bcrypt.compare(password, user.password, function (err, match) {

       if(err) cb(err);
       if(match) {
         cb(null, true);
       } else {
         cb(err);
       }
     })
   }
};
