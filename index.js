var express = require('express');
var app = express();
var student = require('./student');


app.all("/*", function(req, res, next){
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   next();
});



app.get('/', function(req, res){
   res.send("Hello world!");
});

app.use('/student', student);


app.listen(3000);