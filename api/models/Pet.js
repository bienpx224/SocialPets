/**
 * Love.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'mongo',
  attributes: {
    name:{ type:'string' ,maxLength: 100, minLength: 2},
    image:{ type:'string' ,maxLength: 100},
    type:{ type:'string' ,maxLength: 100},
    description:{ type:'string' ,maxLength: 200},
    userId:{ model:'user' },
  }
};
