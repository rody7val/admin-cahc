define(['./module'], function (controllers) {
	'use strict';
	
	controllers.controller('Home', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {
	  if (!$auth.isAuthenticated())
	    return $location.path("/login");

	  if ($location.search().err)
        $scope.feedback_err = $location.search().err;

      if ($location.search().message)
        $scope.feedback_success = $location.search().message;

	  $scope.currentPage = 1;
	  $scope.userLoged = JSON.parse(localStorage.getItem('user'));
	}]);
});