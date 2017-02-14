define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('UserList', ['$scope', '$auth', '$location', '$http', function ($scope, $auth, $location, $http) {  
    if (!$auth.isAuthenticated())
      return $location.path("/login");
  
    $scope.loading = false;
    $scope.users = [];
    $scope.userLoged = JSON.parse(localStorage.getItem('user'));

    this.getAll = function() {
      $scope.loading = true;
  
      $http.get('https://api-cahc.herokuapp.com/users')
      .then(function(res){
        $scope.loading = false;
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 200)
          $scope.users = api.users;
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

    this.getAll();

    $scope.block = function(id){
      $scope.loading = true;
  
      $http.get('https://api-cahc.herokuapp.com/users/'+id+'/block')
      .then(function(res){
        $scope.loading = false;
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 200) {
          $scope.users = api.users
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
    };

    $scope.delete = function(id){
      console.log(id);
      $scope.loading = true;
  
      $http.get('https://api-cahc.herokuapp.com/users/'+id+'/delete')
      .then(function(res){
        $scope.loading = false;
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 200) {
          $scope.users = api.users
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
    };

    $scope.activate = function(id){
      console.log(id);
      $scope.loading = true;
  
      $http.get('https://api-cahc.herokuapp.com/users/'+id+'/active')
      .then(function(res){
        $scope.loading = false;
        $scope.feedback_err = '';
        var api = res.data;
  
        if (res.status === 200) {
          $scope.users = api.users
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
    };

    $scope.setDate = function(date) {
      return moment(date).locale('es').calendar();
    };
  
  }]);
});
