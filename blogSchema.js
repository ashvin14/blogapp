var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
	title:{type:String,unique:true},
	subtitle:{type:String},
	author :{type:String},
	createdOn : Date,
	updatedOn : Date,
	body :{type:String}
})

blogSchema.pre('save',function(next){

	var currentDate = new Date();
	this.updatedOn = currentDate;


	if(!this.createdOn)
		this.createdOn= currentDate;

	next();

})

var blogs = mongoose.model('Blogs',blogSchema);
module.exports = blogs;
