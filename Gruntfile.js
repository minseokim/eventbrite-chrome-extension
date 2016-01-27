module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
        'app/js/lib/angular.min.js',
        'app/js/app.js',
        'app/js/utils-factory.js'
        ],
        dest: 'app/dist/js/app.concat.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! app.js <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: true
      },
      build: {
        src: 'app/dist/js/app.concat.js',
        dest: 'app/dist/js/app.min.js'
      }
    },

    jshint: {
      files: [
        'app/js/*.js',
        '!app/js/lib/*js',
        '!app/dist/**/*js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
        'public/lib/**/*.js',
        'public/dist/**/*.js'
        ]
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: [{
          expand: true,
          cwd: 'app/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'app/dist/css/',
          ext: '.min.css'
        }]
    }
  },

    watch: {
      scripts: {
        files: [
        'app/js/app.js',
        'app/js/utils-factory.js'
        ],
        tasks: [
          'jshint',
          'concat',
          'uglify',
        ]
      }
    },

  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-cssmin');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('default', [
    'watch'
  ]);

  // Create and check file
  grunt.registerTask('build', [
    'jshint',
    'concat',
    'uglify',
    'cssmin'
  ]);

};