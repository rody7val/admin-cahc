define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('NoticeList', ['$scope', '$auth', '$location', '$http', function ($scope, $auth, $location, $http) {  
    if (!$auth.isAuthenticated())
      return $location.path("/login");
  
    $scope.loading = false;
    $scope.notices = [];
  
    this.getAll = function() {
      $scope.loading = true;
  
      $http.get('https://api-cahc.herokuapp.com/notices')
      .then(function(res){
        $scope.loading = false;
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 200)
          $scope.notices = api.notices;
      })
      .catch(function(res){
        if (!res.data)
          $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
  
        var api = res.data;
        if (res.status === 403 && api.err)
          $location.path('/login').search({err: api.err});
        $scope.loading = false;
      });
    };
  
    $scope.setDate = function(date) {
      return moment(date).locale('es').calendar();
    };
  
    this.getAll();
  }]);
});
