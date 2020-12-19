var mongoose = require('mongoose');
var SocialPersonSchema = require('./SocialPersonSchema');

var CommunitySchema = new mongoose.Schema({
	name: String,
	desc: String,
	manager: [SocialPersonSchema],
	members: [SocialPersonSchema]
});

module.exports = CommunitySchema;