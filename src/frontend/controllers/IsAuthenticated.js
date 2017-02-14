define(['./module'], function (controllers) {
	'use strict';
	
	controllers.controller('IsAuthenticated', ['$scope', '$auth', '$location', function ($scope, $auth, $location){

	  $scope.isAuthenticated = function(){
	    return $auth.isAuthenticated();
	  };

	  $scope.getName = function(){
	  	$scope.userLoged = JSON.parse(localStorage.getItem('user'))   
	  	return $scope.userLoged.name.split(' ')[0];
	  }
	}]);
});