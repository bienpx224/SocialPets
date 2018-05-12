/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req,res){
		sails.log.info('homeController-index');
    // res.view({
    //   user: req.user
    // });
    res.view('/homepage');
  }
};
