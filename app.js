var express = require('express');

var mongoose = require('mongoose');
var Blog = require('./blogSchema.js');
var ObjectId = mongoose.Types.ObjectId;
console.log(typeof ObjectId)
mongoose.connect('mongodb://localhost/blogs');

mongoose.connection.once('open',function(err){
	if(err)throw err;
	console.log("successfully connected to database!");
})



var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
app.use(bodyParser.json({extended:true}));
app.use(express.static(__dirname + '/'));


app.get('/home',function(req,res){
	
	Blog.find(function(err,result){
		if(err)
			res.send("sorry there was some problem while loading blogs");
		else
			res.json(result);
		
	})









})
app.get('/blog/:id',function(req,res){
	if(req.params.id)

	Blog.find({_id:ObjectId(req.params.id)},function(err,result){
		
		res.json(result);
	})
})
app.post('/create',function(req,res){
	var blog = new Blog({
		title: req.body.title,
		subtitle:req.body.subtitle,

		author :req.body.author,
		body : req.body.bodyHTML

	})
	
	blog.save(function(err,result){
		if (err)throw err;
		res.send(result._id);
	})
	

})
app.post('/edit',function(req,res){
	var data = {
		title: req.body.title,
		subtitle:req.body.subtitle,

		author :req.body.author,
		body : req.body.bodyHTML,
		id : req.body.id
	}
	Blog.findOneAndUpdate({_id:ObjectId(req.body.id)},{author:req.body.author,title:req.body.title,subtitle:req.body.subtitle,body:req.body.bodyHTML},function(err,result){
		if(err)throw err;
		res.send(result);
	})
})
app.get('/delete/:id',function(req,res){
	
	Blog.deleteOne({_id:ObjectId(req.params.id)},function(err,result){
		if(err)throw err;
		else
			res.json(result.acknowledged)
	})
})



app.listen(8000,function(){
	console.log("app running on port 8000");
})