var config = require('./config'),
  bower_dir = config.bower_dir,
  dist_dir = config.dist_dir,
  src_dir = config.src_dir;

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dist: {
        files: {
          'dist/js/libs.js': [ 
          	bower_dir + 'jquery/jquery.js',
            bower_dir + 'tether/tether.js',
            bower_dir + 'bootstrap/bootstrap.js',
          ],
          'dist/js/moment.js': [
            bower_dir + 'moment/moment.js',
            src_dir + 'moment-with-locales.js'
          ],
          'dist/js/app.js': [ 
          	bower_dir + 'angular/angular.js',
          	bower_dir + 'angular-ui-router/angular-ui-router.js',
          	bower_dir + 'angular-imgur-upload/angular-imgur-upload.min.js',
          	bower_dir + 'satellizer/satellizer.js',
            src_dir + 'templates.js',
          	src_dir + 'app.js',
            src_dir + 'time.js'
          ]
        },
        options: {
          mangle: false
        }
      }
    },

    jshint: {
      all: [ 'Gruntfile.js', 'config.js', 'bin/**/*', 'app/**/*.js', 'src/**/*.js' ]
    },

    html2js: {
      options: {
        module: 'app-cahc.templates',
        singleModule: true,
        useStrict: true,
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      main: {
        src: [ src_dir + 'templates/**/*.html' ],
        dest: src_dir + 'templates.js'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      express: {
        files: [ '*.js', 'app/**/*', 'bin/**/*', 'src/**/*' ],
        tasks: [ 'html2js', 'jshint', 'uglify' ],
        options: {
          atBegin: true,
          spawn: false
        }
      }
    },

    express: {
      dev: {
        options: {
          port: config.port,
          script: 'bin/www'
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: './lib',
          cleanTargetDir: true,
          cleanBowerDir: true,
          install: true,
          copy: true
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('build-prod', [ 'bower', 'html2js', 'uglify' ]);
  grunt.registerTask('build-dev', [ 'bower' ]);
  grunt.registerTask('dev', [ 'express:dev', 'watch' ]);
};