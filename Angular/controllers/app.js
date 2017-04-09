var myApp = angular.module('blogApp',['ngRoute']);
var blogs = [];
myApp.controller('mainController',['apiservice',function(apiservice){
	var main = this;
	this.blogs = [];

	this.loadAllBlogs = function(){
		apiservice.getAllInfo().then(function(response){
			console.log(response)

			main.blogs=response.data;
		
			
		},function(){
			alert('some error has occured while loading api');
		})
	}


}]);
myApp.controller('singleBlogController',['apiservice','$routeParams',function(apiservice,$routeParams){
	 var main =this;
	 this.blog = {};
	 this.blogs=[];
	 this.loadSingeBlog = function(){

	 	var id = $routeParams.id;
	 	console.log(id);
	 	apiservice.getInfoOfSingleblog(id).then(function(response){
	 		console.log(response)
	 		main.blog=response.data[0];

	 		
	 	})
	 	
	 	


	 }
}])
myApp.controller('blogCreateController',['apiservice','$routeParams',function(apiservice,$routeParams){
	var main = this;
	this.blog={};
	
	
	this.createPost = function(){
		var blog = {
				title : main.heading,
				subtitle:main.subHeading,
				bodyHTML :main.bodyHtml,
				author :main.author
		}
		console.log("hello world")
		console.log(blog.bodyHTML)
		apiservice.postBlog(blog).then(function(response){
			alert("blog created successfully");
			console.log(response);
			if(response.status == 200)
				window.location ='#/blog/'+response.data;
		})


	}


}])
myApp.controller('editBlogController',['apiservice','$routeParams',function(apiservice,$routeParams){
	var main = this;
	apiservice.getInfoOfSingleblog($routeParams.id).then(function(response){
		main.blog=response.data;
		console.log(response.data);
		main.heading = response.data[0].title;
		main.subHeading = response.data[0].subtitle;
		main.bodyHtml = response.data[0].body;
		main.author = response.data[0].author;
	})

	this.editPost = function(){
		var blog = {
				title : main.heading,
				subtitle:main.subHeading,
				bodyHTML :main.bodyHtml,
				author :main.author,
				id : $routeParams.id
		}
		console.log(blog.bodyHTML)
		apiservice.postEditBlog(blog).then(function(response){
			alert("blog edited successfully");
			console.log(response);
			if(response.status == 200)
				window.location ='#/home';
		})


	}
	this.deleteBlog = function(id){

		apiservice.deleteBlog($routeParams.id).then(function(){
			alert("blog deleted");
			console.log()
			window.location = '#/home';
		})

	}

}])
