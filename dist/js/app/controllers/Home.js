define(['./module'], function (controllers) {
	'use strict';
	
	controllers.controller('Home', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {
	  if (!$auth.isAuthenticated())
	    return $location.path("/login");
	  $scope.currentPage = 1;
	}]);
});