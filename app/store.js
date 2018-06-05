var redux = require('redux');
var reducer = require('reducer');
import thunk from 'redux-thunk';
 //var store = redux.createStore(reducer);
 var store = redux.createStore(reducer,redux.compose(redux.applyMiddleware(thunk),
   window.devToolsExtension? window.devToolsExtension(): f => f
 ));
 store.subscribe( ()=>{console.log("store: ")})
 module.exports = store;
