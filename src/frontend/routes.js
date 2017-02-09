define(['./app'], function (app) {
    'use strict';
    return app.config(['$authProvider', '$stateProvider', '$locationProvider', function ($authProvider, $stateProvider, $locationProvider) {
	
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
        templateUrl: "frontend/templates/index.html",
        controller: "Home"
      })
      //session
      .state("login", {
        url: "/login",
        templateUrl: "frontend/templates/session/login.html",
        controller: "Login",
        controllerAs: "login"
      })
      .state("signup", {
        url: "/signup",
        templateUrl: "frontend/templates/session/signup.html",
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
        templateUrl: "frontend/templates/notice/new.html",
        controller: "NoticeNew",
        controllerAs: "notice"
      })
      .state("notices", {
        url: "/notices",
        templateUrl: "frontend/templates/notice/list.html",
        controller: "NoticeList",
        controllerAs: "notices"
      })
      .state("notice_show", {
        url: "/notice/:id",
        templateUrl: "frontend/templates/notice/show.html",
        controller: "NoticeShow",
        controllerAs: "notice"
      })
      //default
      .state("otherwise", {
        url: "/*path",
        templateUrl: "frontend/templates/404.html"
      });

    }]);
});