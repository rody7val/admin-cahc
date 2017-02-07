define(['./module'], function (controllers) {
  'use strict';
  
  controllers.controller('NoticeNew', ['$scope', '$auth', '$location', '$http', '$timeout', 'imgurUpload', function ($scope, $auth, $location, $http, $timeout, imgurUpload) {  
    if (!$auth.isAuthenticated())
      return $location.path("/login");
  
    var vm = this;
    $scope.loading = false;
    $scope.feedback_title = '';
    $scope.feedback_content_1 = '';
    $scope.feedback_content_2 = '';
    $scope.feedback_err = '';
    $scope.feedback_category = '';
  
    $scope.url_img = '';
    $scope.img_err = "Error de servicio! Contácte al administrdor del sistema.";
  
    $scope.uploadProgress = 0;
    $scope.upload = function(element) {
      var success = function(result) {
        $scope.loading = false;
        $scope.sending = false;
        $scope.result = result;
        vm.url_img = result.data.link || '';
      };
  
      var error = function(err) {
        $scope.loading = false;
        $scope.error = err;
      };
  
      var notify = function(progress) {
        $scope.loading = false;
        $timeout(function() {
          $scope.progress = progress;
        });
      };
  
      $scope.loading = true;
      $scope.sending = true;
      $scope.error = false;
  
      var image = element.files[0];
      var clientId = "b14fcab1bde9b6c";
      imgurUpload
        .setClientId(clientId);
      imgurUpload
        .upload(image)
        .then(success, error, notify)
        .catch(error);
    };
  
    this.create = function(){
      $scope.loading = true;
  
      $http.post('https://api-cahc.herokuapp.com/notices', {
        notice: {
          title: vm.title || '',
          content_1: vm.content_1 || '',
          content_2: vm.content_2 || '',
          category: vm.category || '',
          url_img: vm.url_img || '',
          status: vm.status || false
        }
      })
      .then(function(res){
        $scope.loading = false;
        $scope.feedback_title = '';
        $scope.feedback_content_1 = '';
        $scope.feedback_content_2 = '';
        $scope.feedback_err = '';
        $scope.feedback_category = '';
        
        $scope.result = false;
        $scope.sending = false;
        $scope.error = false;
        $scope.progress = false;
        $scope.url_img = '';
        var api = res.data;
  
        if (res.status === 200) {
          vm.title = '';
          vm.content_1 = '';
          vm.content_2 = '';
          vm.category = '';
          vm.status = '';
          vm.url_img = '';
          alert('Noticia creada con exito!');
        }
      })
      .catch(function(res){
        if (!res.data){
  
          $scope.loading = false;
          $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
        }
  
        var api = res.data;
        $scope.loading = false;
        $scope.feedback_title = '';
        $scope.feedback_content_1 = '';
        $scope.feedback_content_2 = '';
        $scope.feedback_err = '';
        $scope.feedback_category = '';
  
        if (res.status === 403 && api.err)
          $location.path('/login').search({err: api.err});
        if (res.status === 500 && api.err && api.err.errors && api.err.errors.title)
          $scope.feedback_title = api.err.errors.title.message;
        if (res.status === 500 && api.err && api.err.errors && api.err.errors.content_1)
          $scope.feedback_content_1 = api.err.errors.content_1.message;
        if (res.status === 500 && api.err && api.err.errors && api.err.errors.content_2)
          $scope.feedback_content_2 = api.err.errors.content_2.message;
        if (res.status === 500 && api.err && api.err.errors && api.err.errors.category)
          $scope.feedback_category = api.err.errors.category.message;
      });
    };
  }]);
});