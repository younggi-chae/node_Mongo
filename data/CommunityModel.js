var mongoose = require('mongoose');
var CommunitySchema = require('./schema/CommunitySchema');

var CommunityModel = mongoose.model('Communities', CommunitySchema);

module.exports = CommunityModel;