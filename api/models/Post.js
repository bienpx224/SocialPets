/**
 * Idea.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'mongo',
  attributes: {
    content:{
      type:'string'
    },
    image:{
      type:'string'
    },
    userId:{
      model:'user'
    },
    // loves:{
    //   collection:'love', via:'postId'
    // },
    // dislike:{
    //   collection:'dislike', via:'postId'
    // },
    // comments:{
    //   collection:'comment', via:'postId'
    // }

  }
};
