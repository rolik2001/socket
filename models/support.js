var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var supportSchema = new Schema({
    unix: String,
    email: String,
    text: String,


});

var Support = mongoose.model('Support', supportSchema);

module.exports = Support;
