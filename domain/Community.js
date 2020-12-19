var CommunityManager = require('./CommunityManager').constructor;
var CommunityMember = require('./CommunityMember').constructor;

var MAX_COMMUNITY_ID = 0;

function Community(name, desc, person, id){
	//var _id = ++MAX_COMMUNITY_ID + '';
	var _id = id;
	var _name = name;
	var _desc = desc;
	var _manager = new CommunityManager(person);
	var _members = new Array(0);
	
	this.getId = function(){
		return _id;
	};
	
	this.getName = function(){
		return _name;
	}
	
	this.getDesc = function(){
		return _desc;
	}
	
	this.addMember = function(person){
		_members.push(new CommunityMember(person));
	};
	
	this.setManager = function(person){
		_manager = new CommunityManager(person);
	};
	
	this.getManager = function(){
		return _manager;
	};
	
	this.getMemberCount = function(){
		return _members.length;
	};
	
	this.removeMember = function(memberId){
		var removeIndex = -1;
		
		for(var i=0;i<_members.length;i++){
			if(_members[i].getId() === memberId){
				removeIndex = i;
				break;
			}			
		}
		
		if(removeIndex >= 0){
			_members.splice(removeIndex, 1);
		}		
	};
	
	this.show = function(){
		console.log('[' + _name +'] manager: ');
		_manager.show();
		
		console.log('[' + _name + '] member: ');
		for(var i=0;i<_members.length;i++){
			_members[i].show();
		}
	};	
	
	this.existMember = function(email, password){
		for(var i=0;i<_members.length;i++){
			if(_members[i].getEmail() == email){
				if(_members[i].getPassword() == password){
					return true;
				}
			}
		}
		return false;
	}
	
	this.addMember(person);
	
}

var toDomain = function(modelObject) {
	var personDomain = require('./SocialPerson').toDomain(modelObject.manager[0]);
	var domain = new Community(modelObject.name, modelObject.desc, personDomain, modelObject._id);
	var memberModels = modelObject.members;
	for (var i = 0; i < memberModels.length; i++) {
		var memberDomain = require('./SocialPerson').toDomain(memberModels[i]);
		domain.addMember(memberDomain);
	}
	return domain;
};


exports.constructor = Community;
exports.toDomain = toDomain;











