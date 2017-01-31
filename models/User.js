var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  address: { type: String, required: true, unique: true },
  date: String,
  refer: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
