//var myApp = angular.module('blogApp', ['ngRoute']); 

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home',{
           
        	templateUrl		: 'views/index-view.html',
        	
            controller 		: 'mainController',
          
        	controllerAs 	: 'myBlog'
        })
        .when('/create',{
        	templateUrl     : 'views/create-view.html',
        	controller 		: 'blogCreateController',
        	controllerAs 	: 'currentBlog'
        })
        .when('/blog/:id',{

        	templateUrl     : 'views/blog-view.html',
        	controller 		: 'singleBlogController',
        	controllerAs 	: 'singleBlog'
        })
        .when('/edit/:id',{

            templateUrl     : 'views/edit-view.html',
            controller      :  'editBlogController',
            controllerAs    : 'editBlgCtrl'
        })

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);