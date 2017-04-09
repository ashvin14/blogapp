myApp.service('apiservice',function($http){
		var main=this;
		
		this.getAllInfo=function(){
			return $http.get('/home');
		}
		this.postBlog = function(mydata){
			return $http({

        method: 'POST',
        data  : mydata,
        url:'/create'
        
      })
		}
		this.postEditBlog = function(mydata){
				return $http({

				        method: 'POST',
				        data  : mydata,
				        url:'/edit'
		        
		      })
		}
		this.deleteBlog = function(id){
			return $http({
				method:'GET',
				url:'/delete/'+id

			})
		}
		this.getInfoOfSingleblog = function(id){
			return $http({
				method:'GET',
				url :'/blog/'+id

			})
		}

});