var config = require('./config');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files:[
          {expand: true, cwd: 'src/img', src: ['**'], dest: 'dist/img'},
          {expand: true, cwd: 'src/css', src: ['**'], dest: 'dist/css'},
          {expand: true, cwd: 'src', src: ['templates.js'], dest: 'dist/js/app'},
          {expand: true, cwd: 'src/frontend', src: ['**', '!**/templates/**'], dest: 'dist/js/app'}
        ]
      },
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
        src: [ 'src/frontend/templates/**/*.html' ],
        dest: 'src/templates.js'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      express: {
        files: [ '*.js', 'backend/**/*', 'bin/**/*', 'src/**/*' ],
        tasks: [ 'html2js', 'copy' ],
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
          targetDir: 'dist/js/lib',
          cleanTargetDir: true,
          cleanBowerDir: true,
          install: true,
          copy: true
        }
      }
    },

  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('build-prod', [ 'bower', 'html2js', 'copy' ]);
  grunt.registerTask('build-dev', [ 'bower' ]);
  grunt.registerTask('dev', [ 'copy', 'express:dev', 'watch' ]);
};