var mongoose = require('mongoose');

var buySchema = new mongoose.Schema({
    name: { type: String },
    author: { type: String },
    publisher:{type:String},
    price: { type: Number },
    customer: { type: String },
    address: {type: String },
    phone: {type: String},
    
});

module.exports = mongoose.model('Sale',buySchema)
