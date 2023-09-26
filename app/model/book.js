var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    name: { type: String },
    author: { type: String },
    publisher:{type:String},
    price:{type:Number},
    
});

module.exports = mongoose.model('Book',bookSchema)
