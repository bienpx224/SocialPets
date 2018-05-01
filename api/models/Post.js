/**
 * Idea.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'mongo',
  attributes: {
    content:{ type:'string', maxLength: 500},
    image:{ type:'string' },
    petRelate:{ model: 'pet'},
    userId:{ model:'user' },
    react:{ collection:'react', via:'postId' },
    comments:{ collection:'comment', via:'postId' }

  }
};
