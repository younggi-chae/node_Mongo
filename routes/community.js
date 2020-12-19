//var communityService = require('../domain/CommunityService').CommunityService;
var SocialPerson = require('../domain/SocialPerson').constructor;
var communityService = require('../service/CommunityService');



exports.index = function(req, res){
	/*var communities = communityService.findAllCommunities();
	res.render('community/index',{
		communities : communities
	});*/
	
	communityService.findAllCommunities(function(communities){
		res.render('community/index',{
			communities : communities
		});
	});	
}

exports.open = function(req, res){	
	res.render('community/open');
}

exports.create = function(req, res){
	/*var communities = communityService.registCommunity(req.param('name'),
			req.param('desc'), new SocialPerson('aa@aa.com', '홍길동', '1111'));
	
	res.redirect(302, '/community');*/
	
	communityService.registCommunity(req.param('name'),
			req.param('desc'), new SocialPerson('aa@aa.com', '홍길동', '1111'),
			function(){
					res.redirect(302, '/community');
			});
}










