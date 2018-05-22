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
    name:{type:'string', required:true,maxLength: 50},
    email:{type:'string', unique:true, required:true, email:true ,maxLength: 200},
    password:{type:'string', minLength:6, required:true,maxLength: 200},
    phone:{type:'string',maxLength: 20},
    day_date:{type:'string',maxLength: 10},
    month_date:{type:'string',maxLength: 10},
    year_date:{type:'string',maxLength: 10},
    age_range:{type:'string',maxLength: 10},
    gender:{type:'string',maxLength: 10},
    picture:{type:'string',maxLength: 255},
    cover:{type:'string',maxLength: 255},
    address:{type:'string',maxLength: 255},
    country:{type:'string',maxLength: 255},
    isActive:{type: 'boolean'},
    isAdmin : {type: 'boolean'},
    isOnline:{type:'boolean'},
    description:{type:'string',maxLength: 255},
    job:{type:'string',maxLength: 10},
    university:{type:'string',maxLength: 100},
    point : {type: 'string', maxLength: 100},
    petlove: {type: 'string',maxLength: 50},
    // Setting your account
    enableFollow:{type:'boolean'},
    enableSound:{type:'boolean'},
    enableNotification:{type:'boolean'},
    // this defines the others half of our association
    //with idea, this is the 'many' side.

    // Pets of your
    pets:{collection:'Pet', via:'userId'},
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
      // delete obj.secret;
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
