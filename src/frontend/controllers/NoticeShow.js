define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('NoticeShow', ['$scope', '$auth', '$http', '$location', '$stateParams', function ($scope, $auth, $http, $location, $stateParams) {
    if (!$auth.isAuthenticated())
      return $location.path("/login");
  
    $scope.id = $stateParams.id;
    $scope.loading = false;
    $scope.feedback_err = '';
  
    this.getOne = function() {
      $scope.loading = true;
  
      $http.get('https://api-cahc.herokuapp.com/notices/' + $scope.id)
      .then(function(res){
        $scope.loading = false;
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 200)
          $scope.notice = api.notice;
      })
      .catch(function(res){
        if (!res.data)
          $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
  
        var api = res.data;
        if (res.status === 500 && api.err)
          $scope.feedback_err = api.err;
  
        $scope.loading = false;
      });
    };
  
    $scope.setDate = function(date) {
      return moment(date).locale('es').calendar();
    };
  
    this.getOne();
  }]);
});