define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('Login', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {
    if ($auth.isAuthenticated())
      return $location.path("/");
  
    var vm = this;
    $scope.loading = false;
    $scope.feedback_email = '';
    $scope.feedback_password = '';
    $scope.feedback_err = '';
  
    if ($location.search().err)
      $scope.feedback_err = $location.search().err;
  
    this.login = function(){
      $scope.loading = true;
  
      $auth.login({
        email: vm.email,
        password: vm.password
      })
      .then(function(res){
        $scope.loading = false;
        var api = res.data;
  
        if (res.status === 200) return $location.path("/");
      })
      .catch(function(res){
        $scope.loading = false;
        $scope.feedback_email = '';
        $scope.feedback_password = '';
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 401 && api.err === "Email incorrecto") {
          $scope.feedback_email = api.err;
          return;
        }
        else if (res.status === 401 && api.err === "Contraseña incorrecta") {
          $scope.feedback_password = api.err;
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