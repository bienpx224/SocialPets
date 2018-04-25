/**
 * Comment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'mongo',
  attributes: {
    content:{ type:'string', maxLength: 1000},
    isActive: {type: 'boolean'},
    userId:{model:'user'},
    postId:{ model: 'post'},
  }
};
