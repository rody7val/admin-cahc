define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('Signup', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {
    if ($auth.isAuthenticated())
      return $location.path("/");
  
    var vm = this;
    $scope.loading = false;
    $scope.feedback_email = '';
    $scope.feedback_password = '';
    $scope.feedback_err = '';
  
    this.signup = function() {
      $scope.loading = true;
  
      $auth.signup({
        email: vm.email,
        password: vm.password
      })
      .then(function (res) {
        var api = res.data;
  
        if (res.status === 200) {
          $auth.login({ email: vm.email, password: vm.password })
          .then(function(){
            $scope.loading = false;
            return $location.path("/");
          });
        }
      })
      .catch(function(res) {
        $scope.loading = false;
        $scope.feedback_email = '';
        $scope.feedback_password = '';
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 500 && api.err && api.err.email) {
          $scope.feedback_email = api.err.email.message;
          return;
        }
        else if (res.status === 500 && api.err && api.err.password) {
          $scope.feedback_password = api.err.password.message;
          return;
        }
        else if (res.status === 406) {
          $scope.feedback_err = api.err;
          return;
        }
  
        $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
      });
    };
  }]);
});