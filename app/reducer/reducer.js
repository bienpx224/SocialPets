var redux = require('redux');
var testReducer = require('testReducer');
var userReducer = require('userReducer');
var postReducer = require('postReducer');
var followReducer = require('followReducer');
var historyReducer = require('historyReducer');

var reducer = redux.combineReducers({testReducer,userReducer,postReducer,followReducer,historyReducer});

 module.exports = reducer;
