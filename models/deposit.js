var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var depositSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    unix: String,
    date: String,
    balance: Number,
    balances:Number,
    txid: {
        type: String,
        unique: true
    },
    status:{
      type: String
    },

});

var Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
