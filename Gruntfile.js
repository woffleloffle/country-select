module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: new RegExp('^app/'),
        src: ['app/index.html']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', 'dist']
        }]
      },
      post: {
        files: [{
          dot: true,
          src: ['.tmp']
        }]
      }
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'app/css/',
          src: 'country-select.css',
          dest: '.tmp/css/'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/css/country-select.min.css' : ['.tmp/css/country-select.css']
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/js/country-select.min.js': ['app/js/country-select.js']
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/img',
          src: 'flags.png',
          dest: 'dist/img'
        }]
      }
    }

  });


  grunt.registerTask('default', [
    'clean',
    'autoprefixer',
    'uglify',
    'cssmin',
    'imagemin',
    'clean:post'
  ]);

  grunt.registerTask('init', [
    'wiredep'
  ]);

};