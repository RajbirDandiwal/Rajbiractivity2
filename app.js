var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public/images/', express.static('./public/images'));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

require('./app/model/book');

mongoose.connect('mongodb://127.0.0.1:27017/onlinebookstore',{useNewUrlParser:true},{useUnifiedTopology:true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error in the connection'));
db.once('open',function(){
    console.log('the databse is connected...')
});


app.get('/', function (req, res) {
     
    res.render('index');
})

const bookcontroller = require('./app/controllers/bookcontroller');
app.get('/books',bookcontroller.getallbooks);
app.get('/books/findbyname',bookcontroller.getbyname);
app.get('/books/findbypublisher', bookcontroller.getbypublisher);
app.get('/book/add',function(req,res){
    res.render('addbook');
});
app.post('/book/add', bookcontroller.create);
//delete a book
const bookmodel = require('./app/model/book');
app.get('/books/delete/(:id)', function (req, res, next) {
     const {ObjectId} = require('mongodb')
    var id = req.params.id;
    console.log(id);
  db.collection('books').deleteOne({ _id: new ObjectId(req.params.id) }, function(err, res) 
{
    if (err) {
    throw err;
    }
  });
    res.redirect("/books");
})

app.get('/book/buy',bookcontroller.getallbooks);

app.post('/book/buy', function (req, res) {
    name = req.body.name;
    author = req.body.author;
    publisher = req.body.publisher;
    price = req.body.price;
    
    res.render('buybook.ejs',{"name":name,"author": author,"publisher": publisher,"price":price});
});
const buycontroller = require('./app/controllers/buycontroller');
app.get('/book/add',function(req,res){
    res.render('addbook');
});
app.post('/buy/add', buycontroller.create);
app.get('/soldbooks', buycontroller.getallsoldbooks);
app.get('/soldbooks/findbyname', buycontroller.getbyname);
app.get('/soldbooks/findbycustomer',buycontroller.getbycustomer);
app.listen('3000');



