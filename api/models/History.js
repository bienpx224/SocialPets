/**
 * History.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'mongo',
  attributes: {
    uid : 'STRING',
    userId:{ model: 'user' },
    action : {type:'string'},
    isActive : {type: 'boolean'},
    related_postId : {model: 'post'},
    related_userId : {model: 'user'},
    related_cmtId  : {model: 'comment'}
  }
};
