define(['./module'], function (controllers) {
	'use strict';
	
	controllers.controller('IsAuthenticated', ['$scope', '$auth', '$location', function ($scope, $auth, $location){
	  $scope.isAuthenticated = function(){
	    return $auth.isAuthenticated();
	  };
	}]);
});