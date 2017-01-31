var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var withdrawSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    unix: String,
    date: String,
    balance: Number,
    pos: {
        type: String,
        default: 'p'
    },
    txid:  String,
    status:String,
    refer:String,
    referal: String,
});

var Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;
