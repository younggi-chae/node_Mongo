var mongoose = require('mongoose');
var SocialPersonSchema = require('./schema/SocialPersonSchema');

var SocialPersonModel = mongoose.model('SocialPeople', SocialPersonSchema);

module.exports = SocialPersonModel;
