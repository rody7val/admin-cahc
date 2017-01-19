angular
  .module('app-cahc', ['satellizer', 'ui.router'])
  .config(function ($authProvider, $stateProvider, $locationProvider) {

    $authProvider.loginUrl = "https://api-cahc.herokuapp.com/auth/login"
    $authProvider.signupUrl = "https://api-cahc.herokuapp.com/auth/signup"
    $authProvider.tokenName = "token"
    $authProvider.tokenPrefix = "cahc"
    
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    // Configuración de las rutas/estados
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "templates/index.html",
        controller: "HomeController"
      })
      .state("login", {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: "LoginController",
        controllerAs: "login"
      })
      .state("signup", {
        url: "/signup",
        templateUrl: "templates/signup.html",
        controller: "SignUpController",
        controllerAs: "signup"
      })
      .state("logout", {
        url: "/logout",
        templateUrl: null,
        controller: "LogoutController"
      })
      .state("notice", {
        url: "/notice",
        templateUrl: "templates/notice.html",
        controller: "NoticeController",
        controllerAs: "notice"
      })
      .state("notices", {
        url: "/notices",
        templateUrl: "templates/notice_list.html",
        controller: "NoticesController",
        controllerAs: "notices"
      })
      .state("otherwise", {
        url: "/*path",
        templateUrl: "templates/404.html"
      })
  })
  .controller("HomeController", HomeController)
  .controller("IsAuthenticated", IsAuthenticated)
  .controller("SignUpController", SignUpController)
  .controller("LoginController", LoginController)
  .controller("LogoutController", LogoutController)
  .controller("NoticeController", NoticeController)
  .controller("NoticesController", NoticesController)


function HomeController($scope, $auth, $location) {
  if (!$auth.isAuthenticated())
    return $location.path("/login")
  $scope.currentPage = 1;
}

function IsAuthenticated($scope, $auth, $location){
  $scope.isAuthenticated = function(){
    return $auth.isAuthenticated();
  }
}

function SignUpController($scope, $auth, $location) {
  if ($auth.isAuthenticated())
    return $location.path("/")

  var vm = this
  $scope.loading = false
  $scope.feedback_email = ''
  $scope.feedback_password = ''
  $scope.feedback_err = ''

  this.signup = function() {
    $scope.loading = true

    $auth.signup({
      email: vm.email,
      password: vm.password
    })
    .then(function (res) {
      var api = res.data

      if (res.status === 200) {
        $auth.login({ email: vm.email, password: vm.password })
        .then(function(){
          $scope.loading = false
          return $location.path("/")
        })
      }
    })
    .catch(function(res) {
      $scope.loading = false
      $scope.feedback_email = ''
      $scope.feedback_password = ''
      $scope.feedback_err = ''
      var api = res.data

      if (res.status === 500 && api.err && api.err.email) {
        $scope.feedback_email = api.err.email.message
        return
      }
      else if (res.status === 500 && api.err && api.err.password) {
        $scope.feedback_password = api.err.password.message
        return
      }
      else if (res.status === 406) {
        $scope.feedback_err = api.err
        return
      }

      $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema."
    })
  }
}

function LoginController($scope, $auth, $location) {
  if ($auth.isAuthenticated())
    return $location.path("/")

  var vm = this
  $scope.loading = false
  $scope.feedback_email = ''
  $scope.feedback_password = ''
  $scope.feedback_err = ''

  if ($location.search().err)
    $scope.feedback_err = $location.search().err

  this.login = function(){
    $scope.loading = true

    $auth.login({
      email: vm.email,
      password: vm.password
    })
    .then(function(res){
      $scope.loading = false
      var api = res.data

      if (res.status === 200) return $location.path("/")
    })
    .catch(function(res){
      $scope.loading = false
      $scope.feedback_email = ''
      $scope.feedback_password = ''
      $scope.feedback_err = ''
      var api = res.data

      if (res.status === 401 && api.err === "Email incorrecto") {
        $scope.feedback_email = api.err
        return
      }
      else if (res.status === 401 && api.err === "Contraseña incorrecta") {
        $scope.feedback_password = api.err
        return
      }
      else if (res.status === 406) {
        $scope.feedback_err = api.err
        return
      }

      $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema."
    })
  }
}

function LogoutController($scope, $auth, $location) {
  if (!$auth.isAuthenticated())
    return $location.path("/login")

  $auth.logout()
    .then(function() {
      $location.path("/login")
    })
}

function NoticeController($scope, $auth, $location, $http) {  
  if (!$auth.isAuthenticated())
    return $location.path("/login")

  var vm = this
  $scope.loading = false
  $scope.feedback_title = ''
  $scope.feedback_content_1 = ''
  $scope.feedback_content_2 = ''
  $scope.feedback_err = ''
  $scope.feedback_category = ''

  this.create = function(){
    $scope.loading = true

    $http.post('https://api-cahc.herokuapp.com/notices', {
      notice: {
        title: vm.title || '',
        content_1: vm.content_1 || '',
        content_2: vm.content_2 || '',
        category: vm.category || '',
        status: vm.status || false
      }
    })
    .then(function(res){
      $scope.loading = false
      $scope.feedback_title = ''
      $scope.feedback_content_1 = ''
      $scope.feedback_content_2 = ''
      $scope.feedback_err = ''
      $scope.feedback_category = ''
      var api = res.data

      if (res.status === 200) {
        vm.title = ''
        vm.content_1 = ''
        vm.content_2 = ''
        vm.category = ''
        vm.status = ''
        alert('Noticia creada con exito!')
      }
    })
    .catch(function(res){
      if (!res.data)
        return $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema."

      var api = res.data
      $scope.loading = false
      $scope.feedback_title = ''
      $scope.feedback_content_1 = ''
      $scope.feedback_content_2 = ''
      $scope.feedback_err = ''
      $scope.feedback_category = ''

      if (res.status === 403 && api.err)
        $location.path('/login').search({err: api.err})
      if (res.status === 500 && api.err && api.err.errors && api.err.errors.title)
        $scope.feedback_title = api.err.errors.title.message
      if (res.status === 500 && api.err && api.err.errors && api.err.errors.content_1)
        $scope.feedback_content_1 = api.err.errors.content_1.message
      if (res.status === 500 && api.err && api.err.errors && api.err.errors.content_2)
        $scope.feedback_content_2 = api.err.errors.content_2.message
      if (res.status === 500 && api.err && api.err.errors && api.err.errors.category)
        $scope.feedback_category = api.err.errors.category.message
    })
  }
}

function NoticesController($scope, $auth, $location, $http) {  
  if (!$auth.isAuthenticated())
    return $location.path("/login")

  $scope.loading = false
  $scope.notices = []

  this.getAll = function() {
    $scope.loading = true

    $http.get('https://api-cahc.herokuapp.com/notices')
    .then(function(res){
      $scope.loading = false
      $scope.feedback_err = ''
      var api = res.data

      if (res.status === 200)
        $scope.notices = api.notices
    })
    .catch(function(res){
      if (!res.data)
        $scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema."

      var api = res.data
      if (res.status === 403 && api.err)
        $location.path('/login').search({err: api.err})
      $scope.loading = false
    })
  }

  $scope.setDate = function(date) {
    return moment(date).locale('es').calendar()
  }

  this.getAll()
}