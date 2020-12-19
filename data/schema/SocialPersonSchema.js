var mongoose = require('mongoose');

var SocialPersonSchema = new mongoose.Schema({
	email: String,
	name: String,
	password: String
});

module.exports = SocialPersonSchema;
