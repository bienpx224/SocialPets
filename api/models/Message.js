/**
 * Message.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'mongo',
  attributes: {
    inboxId:{ model:'inbox' },
    send_userId:{ model:'user' },
    receive_userId:{ model:'user' },
    content : {type:'string',maxLength: 1000},
    image : {type:'string'},
    isRead: {type: 'boolean'},
    isActive: {type: 'boolean'},
  }
};
