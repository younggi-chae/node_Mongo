var CommunityModel = require('../data/CommunityModel');
var SocialPersonModel = require('../data/SocialPersonModel');
var SocialPerson = require('../domain/SocialPerson')
var Community = require('../domain/Community');


function findPersonByEmail(email, callback){
	SocialPersonModel.findOne({email: email}, function(err, personModelObject){
		var personDomain = null;
		if(personModelObject !== null){
			personDomain = SocialPerson.toDomain(personModelObject);
		}
		callback(personDomain);
	});
}


function registPerson(personDomain, callback){
	findPersonByEmail(personDomain.getEmail(), function(pesonExist) {
		if(pesonExist !== null){
			callback(false);
		}else{
			var personModelObject = personDomain.getModelObject();
			SocialPersonModel.create(personModelObject, function(err){
				if(err){
					throw err;
				}
				console.log('create SocialPerson');
				callback(true);
			});
		}
	});
}


function registCommunity(name, desc, adminPerson, callback){
	registPerson(adminPerson, function(registered) {
		var communityModelObject = {
				name : name,
				desc : desc,
				manager: [adminPerson.getModelObject()]
		};
		
		CommunityModel.create(communityModelObject, function(err){
			callback();
		});
		
	});
}


function findAllCommunities(callback){
	CommunityModel.find({}, function(err, communityModelObjects){
		var communities = [];
		for(var i=0;i<communityModelObjects.length;i++){
			var communityDomain = Community.toDomain(communityModelObjects[i]);
			communities.push(communityDomain);
		}
		callback(communities);
	});
}


function CommunityService(){
	this.registCommunity = registCommunity;
	this.findAllCommunities = findAllCommunities;
}


module.exports = new CommunityService();








