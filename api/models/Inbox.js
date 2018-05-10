/**
 * Inbox.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'mongo',
  attributes: {
    first_userId:{ model:'user' },
    second_userId:{ model:'user' },
    messageIdLatest: {model: 'message'},
    isActive: {type: 'boolean'},
    listMsg : {collection:'Message', via:'inboxId'},
  }
};
