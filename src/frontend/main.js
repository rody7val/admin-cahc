require.config({

    waitSeconds : 30,

    paths: {
        'domReady': '/js/lib/requirejs-domready/domReady',
        'angular': '/js/lib/angular/angular',
        'uiRouter': '/js/lib/angular-ui-router/angular-ui-router',
        'satellizer': '/js/lib/satellizer/satellizer',
        'imgurUpload': '/js/lib/angular-imgur-upload/angular-imgur-upload.min',
        'app-cahc.templates': '/js/app/templates'
    },

    shim: {
        'angular': { exports: 'angular' },
        'uiRouter': { deps: ['angular'] },
        'satellizer': { deps: ['angular'] },
        'imgurUpload': { deps: ['angular'] },
        'app-cahc.templates': { deps: ['angular'] }
    },

    deps: ['./bootstrap']
});