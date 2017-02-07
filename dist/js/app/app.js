define([
    'angular',
    'uiRouter',
    'satellizer',
    'imgurUpload',
    'app-cahc.templates',
    './controllers/index'
], function (angular) {
    'use strict';

    return angular.module('app', [
        'ui.router',
        'satellizer',
        'imgurUpload',
        'app-cahc.templates',
        'app.controllers'
    ]);
});
