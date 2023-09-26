var mongoose = require('mongoose');

const buymodel = require('../model/buy');


module.exports= {
getallsoldbooks: async function(req,res){
    const result = await buymodel.find();
    res.render('soldbooklist.ejs',{allthebooks:result});
},
getbyname: async function(req,res){
    console.log("It is the find by name")
    const {name} = req.query;
    const result = await buymodel.find({ name: { $regex: '.*' + name + '.*' } });
    res.render('soldbooklist.ejs',{allthebooks:result});

},
getbycustomer: async function(req,res){
    console.log("We are in getbycustomer function");
    const {customer} = req.query;
    const result = await buymodel.find({ customer: { $regex: '.*' + customer + '.*' } });
    res.render('soldbooklist.ejs',{allthebooks:result});
},
create: function(req,res){
    console.log("We are inside create");
    var buyinfo = req.body;
    buyinfo = {
        "name": req.body.name,
        "author": req.body.author,
        "publisher": req.body.publisher,
        "price": req.body.price,
        "customer": req.body.customer,
        "address": req.body.address,
        "phone": req.body.phone,
        
       
    }
    buymodel.create(buyinfo);
    res.redirect('/soldbooks');
    }


}