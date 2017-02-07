define(['./module'], function (controllers) {
	'use strict';
	
	controllers.controller('Logout', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {
	  if (!$auth.isAuthenticated())
	    return $location.path("/login");
	
	  $auth.logout()
	    .then(function() {
	      $location.path("/login");
	    });
	}]);
});