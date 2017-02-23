define(['./module'], function (controllers) {
  'use strict';

    controllers.controller('Forgot', ['$scope', '$auth', '$location', '$http', function ($scope, $auth, $location, $http) {
    if ($auth.isAuthenticated())
      return $location.path("/");

    var vm = this;
    $scope.loading = false;
    $scope.feedback_email = '';
    $scope.feedback_err = '';
    $scope.feedback_success = '';

    if ($location.search().err)
      $scope.feedback_err = $location.search().err;
  
    this.forgot = function(){
      $scope.loading = true;
  
      $http.post('https://api-cahc.herokuapp.com/auth/forgot', {
        email: vm.email,
      })
      .then(function(res){
        var api = res.data;
  
        if (res.status === 200) {
        	$scope.loading = false;
        	$scope.feedback_email = '';
    		  $scope.feedback_err = '';
    		  $scope.feedback_success = '';
    		  vm.email = '';

        	if (api.message) {
        		return $scope.feedback_success = api.message;
        	}
        }
      })
      .catch(function(res){
        $scope.loading = false;
        $scope.feedback_success = '';
        $scope.feedback_email = '';
        $scope.feedback_err = '';
        var api = res.data;
  
        if (api.err && api.status == 401) {
          return $scope.feedback_email = api.err;
        } else if (api.err && api.status == 500) {
          return $scope.feedback_err = api.err;
        }
        $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
      });
    };
  }]);
});