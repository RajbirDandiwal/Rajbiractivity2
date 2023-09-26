var mongoose = require('mongoose');

const bookmodel = require('../model/book');


module.exports= {
getallbooks: async function(req,res){
    const result = await bookmodel.find();
    res.render('booklist.ejs',{allthebooks:result});
},
getbyname: async function(req,res){
    console.log("It is the find by name")
    const {name} = req.query;
    const result = await bookmodel.find({ name: { $regex: '.*' + name + '.*' } });
    res.render('booklist.ejs',{allthebooks:result});

},
getbypublisher: async function(req,res){
    console.log("We are in getbyyear function");
     const {publisher} = req.query;
    const result = await bookmodel.find({ publisher: { $regex: '.*' + publisher + '.*' } });
    res.render('booklist.ejs',{allthebooks:result});
},
create: function(req,res){
    console.log("We are inside create");
    var bookinfo = req.body;
    bookinfo = {
        "name": req.body.name,
        "author": req.body.author,
        "publisher": req.body.publisher,
        "price": req.body.price,
        
       
    }
    bookmodel.create(bookinfo);
    res.redirect('/books');
    }


}