angular
  .module('app-cahc', ['satellizer', 'ui.router', 'imgurUpload', 'app-cahc.templates'])
  .config(function ($authProvider, $stateProvider, $locationProvider) {

    $authProvider.loginUrl = "https://api-cahc.herokuapp.com/auth/login";
    $authProvider.signupUrl = "https://api-cahc.herokuapp.com/auth/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "cahc";
    
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    // Configuración de las rutas/estados
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "templates/index.html",
        controller: "Home"
      })
      //session
      .state("login", {
        url: "/login",
        templateUrl: "templates/session/login.html",
        controller: "Login",
        controllerAs: "login"
      })
      .state("signup", {
        url: "/signup",
        templateUrl: "templates/session/signup.html",
        controller: "Signup",
        controllerAs: "signup"
      })
      .state("logout", {
        url: "/logout",
        templateUrl: null,
        controller: "Logout"
      })
      //notice
      .state("notice", {
        url: "/notice",
        templateUrl: "templates/notice/new.html",
        controller: "NoticeNew",
        controllerAs: "notice"
      })
      .state("notices", {
        url: "/notices",
        templateUrl: "templates/notice/list.html",
        controller: "NoticeList",
        controllerAs: "notices"
      })
      .state("notice_show", {
        url: "/notice/:id",
        templateUrl: "templates/notice/show.html",
        controller: "NoticeShow",
        controllerAs: "notice"
      })
      //default
      .state("otherwise", {
        url: "/*path",
        templateUrl: "templates/404.html"
      });
  })
  .controller("Home", Home)
  .controller("IsAuthenticated", IsAuthenticated)
  .controller("Signup", Signup)
  .controller("Login", Login)
  .controller("Logout", Logout)
  .controller("NoticeNew", NoticeNew)
  .controller("NoticeList", NoticeList)
  .controller("NoticeShow", NoticeShow);

function NoticeShow($scope, $auth, $http, $location, $stateParams){
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
}

function Home($scope, $auth, $location) {
  if (!$auth.isAuthenticated())
    return $location.path("/login");
  $scope.currentPage = 1;
}

function IsAuthenticated($scope, $auth, $location){
  $scope.isAuthenticated = function(){
    return $auth.isAuthenticated();
  };
}

function Signup($scope, $auth, $location) {
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
}

function Login($scope, $auth, $location) {
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
}

function Logout($scope, $auth, $location) {
  if (!$auth.isAuthenticated())
    return $location.path("/login");

  $auth.logout()
    .then(function() {
      $location.path("/login");
    });
}

function NoticeNew($scope, $auth, $location, $http, $timeout, imgurUpload) {  
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
}

function NoticeList($scope, $auth, $location, $http) {  
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
}