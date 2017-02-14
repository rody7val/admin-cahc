define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('NoticeShow', ['$scope', '$auth', '$http', '$location', '$stateParams', function ($scope, $auth, $http, $location, $stateParams) {
    if (!$auth.isAuthenticated())
      return $location.path("/login");
  
    $scope.id = $stateParams.id;
    $scope.loading = false;
    $scope.feedback_err = '';
    $scope.userLoged = JSON.parse(localStorage.getItem('user'));
  
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
        $scope.loading = false;
        $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
      });
    };
  
    $scope.setDate = function(date) {
      return moment(date).locale('es').calendar();
    };
  
    this.getOne();

    $scope.delete = function(id) {
      $scope.loading = true;
  
      $http.get('https://api-cahc.herokuapp.com/notices/'+id+'/delete')
      .then(function(res){
        $scope.loading = false;
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 200) {
          return $location.path("/notices");
        }
      })
      .catch(function(res){
        if (!res.data){
          $scope.loading = false;
          $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
        }
  
        var api = res.data;
        $scope.loading = false;
        $scope.feedback_err = '';
  
        if (res.status === 500 && api.err)
          $scope.feedback_err = api.err
      });
    }
  }]);
});